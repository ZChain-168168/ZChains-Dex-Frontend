import { useCallback, useState } from 'react'
import { TransactionReceipt, TransactionResponse } from '@ethersproject/providers'

import { logError, isUserRejected } from 'utils/sentry'
import useActiveWeb3React from './useActiveWeb3React'

export type TxResponse = TransactionResponse | null
export type TxCatchReceipt = {
  txReceipt: TransactionReceipt | null
  txResponse: TxResponse | null
  status: boolean
  message: string
}

export type CatchTxErrorReturn = {
  fetchWithCatchTxError: (fn: () => Promise<TxResponse>) => Promise<TxCatchReceipt>
  loading: boolean
}

type ErrorData = {
  code: number
  message: string
}

type TxError = {
  data: ErrorData
  error: string
}

// -32000 is insufficient funds for gas * price + value
const isGasEstimationError = (err: TxError): boolean => err?.data?.code === -32000

export default function useCatchTxErrorMessage(): CatchTxErrorReturn {
  const { provider } = useActiveWeb3React()
  const [loading, setLoading] = useState(false)

  const handleNormalError = useCallback((error): string | undefined => {
    logError(error)
    return 'Please try again. Confirm the transaction and make sure you are paying enough gas!'
  }, [])

  const fetchWithCatchTxError = useCallback(
    async (callTx: () => Promise<TxResponse>): Promise<TxCatchReceipt> => {
      let txResponse: TxResponse = null
      let message = ''

      try {
        setLoading(true)

        /**
         * https://github.com/vercel/swr/pull/1450
         *
         * wait for useSWRMutation finished, so we could apply SWR in case manually trigger tx call
         */
        txResponse = await callTx()

        // toastSuccess(`${t('Transaction Submitted')}!`, <ToastDescriptionWithTx txHash={tx.hash} />)

        const txReceipt = await txResponse.wait()

        return { txReceipt, txResponse, status: true, message: 'Success' }
      } catch (error: any) {
        if (!isUserRejected(error)) {
          if (!txResponse) {
            message = handleNormalError(error)
          } else {
            provider
              .call(txResponse, txResponse.blockNumber)
              .then(() => {
                message = handleNormalError(error)
              })
              .catch((err: any) => {
                if (isGasEstimationError(err)) {
                  message = handleNormalError(error)
                } else {
                  logError(err)

                  let recursiveErr = err

                  let reason: string | undefined

                  // for MetaMask
                  if (recursiveErr?.data?.message) {
                    reason = recursiveErr?.data?.message
                  } else {
                    // for other wallets
                    // Reference
                    // https://github.com/Uniswap/interface/blob/ac962fb00d457bc2c4f59432d7d6d7741443dfea/src/hooks/useSwapCallback.tsx#L216-L222
                    while (recursiveErr) {
                      reason = recursiveErr.reason ?? recursiveErr.message ?? reason
                      recursiveErr = recursiveErr.error ?? recursiveErr.data?.originalError
                    }
                  }

                  const REVERT_STR = 'execution reverted: '
                  const indexInfo = reason?.indexOf(REVERT_STR)
                  const isRevertedError = indexInfo >= 0

                  if (isRevertedError) reason = reason.substring(indexInfo + REVERT_STR.length)
                  message = isRevertedError ? `Transaction failed with error: ${reason}` : 'Transaction failed.'
                }
              })
          }
        }
      } finally {
        setLoading(false)
      }

      return { txReceipt: null, txResponse, status: false, message }
    },
    [handleNormalError, provider],
  )

  return {
    fetchWithCatchTxError,
    loading,
  }
}

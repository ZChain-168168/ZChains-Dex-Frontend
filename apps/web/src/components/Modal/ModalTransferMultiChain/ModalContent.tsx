import styled from 'styled-components'
import { Box, Text, Flex, Button } from '@pancakeswap/uikit'
import { ChainLogo } from 'components/Logo/ChainLogo'
import { formatCode } from 'helpers'
import { getBlockExploreLink } from 'utils'
import { ApprovalState } from 'hooks/useApproveCallback'

const TransferContentStyled = styled(Flex)`
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.xs} {
    max-height: none;
    /* height: 90vh; */
  }
  ${({ theme }) => theme.mediaQueries.md} {
    max-height: none;
    height: auto;
  }

  button {
    background: rgb(240, 185, 11);
    // box-shadow: -2px -2px 2px #1e3238, inset 0px -2px 1px #001015;
    border-radius: 8px;
    color: #000;
  }

  button:disabled {
    background: #e0e0eb;
    color: rgb(143, 155, 179);
  }

  .box-transfer {
    // background: #000000;
    border-radius: 12px;
    padding: 24px 16px;
    margin-bottom: 24px;

    ${({ theme }) => theme.mediaQueries.sm} {
      padding: 24px;
    }

    .wIcon {
      > svg {
        width: 28px;
        height: 28px;
        ${({ theme }) => theme.mediaQueries.sm} {
          width: 32px;
          height: 32px;
        }
      }
    }
  }
`

export const TransferContent = ({
  dataModal,
  approvalState,
  handleApprove,
  loading,
  handleTransfer,
  gasFee,
  tokenFeePercent,
}) => {
  const { fromNetwork, toNetwork, currency, address, sendAmount, receiveAmount, native } = dataModal || {}
  // console.log('TransferContent address==>', address);

  return (
    <TransferContentStyled>
      <div className="box-transfer">
        <Text color="rgb(240, 185, 11)" fontSize={[16, , 20]} mb={[12, 24]}>
          From
        </Text>
        <Flex justifyContent="space-between" mb={[12, 24]}>
          <Flex alignItems="center">
            <Box className="wIcon" mr="6px">
              <ChainLogo chainId={fromNetwork?.chainid} />
            </Box>
            <Text color="#fafafa" fontSize={[14, , 16]} ml={[0, , '10px']}>
              {fromNetwork?.title}
            </Text>
          </Flex>
          <Text color="#fafafa" fontSize={[14, , 16]} textAlign="right">
            -{sendAmount} {currency?.code}
          </Text>
        </Flex>{' '}
        <Flex justifyContent="space-between">
          <Text color="#fafafa" fontSize={[14, , 16]}>
            Address
          </Text>
          <Text
            as="a"
            fontSize={[14, , 16]}
            textAlign="right"
            href={getBlockExploreLink(currency?.token_address, 'address', fromNetwork?.chainid)}
            target="_blank"
            rel="noreferrer"
            color="#fafafa"
          >
            {formatCode(address, 8, 8)}
          </Text>
        </Flex>
      </div>
      <div className="box-transfer">
        <Text color="rgb(240, 185, 11)" fontSize={[16, , 20]} mb={[12, 24]}>
          To
        </Text>
        <Flex justifyContent="space-between" mb={[12, 24]}>
          <Flex alignItems="center">
            <Box className="wIcon" mr="6px">
              <ChainLogo chainId={toNetwork.chainid} />
            </Box>
            <Text color="#fafafa" fontSize={[14, , 16]}>
              {toNetwork.title}
            </Text>
          </Flex>
          <Text color="#fafafa" fontSize={[14, , 16]} textAlign="right">
            +{receiveAmount * (1 - tokenFeePercent)} {currency.code}
          </Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text color="#fafafa" fontSize={[14, , 16]}>
            Address
          </Text>
          <Text
            as="a"
            fontSize={[14, , 16]}
            textAlign="right"
            href={getBlockExploreLink(currency.token_address, 'address', toNetwork.chainid)}
            target="_blank"
            rel="noreferrer"
            color="#fafafa"
          >
            {formatCode(address, 8, 8)}
          </Text>
        </Flex>
      </div>
      <div className="card-info">
        <Flex justifyContent="space-between" mb="5px">
          <Text fontSize={['13px', '', '16px']} color="rgb(240, 185, 11)">
            System Fee ({tokenFeePercent ? tokenFeePercent * 100 : '--'}%):
          </Text>
          <Text fontSize={['13px', '', '16px']} color="#fafafa">
            {+sendAmount * +tokenFeePercent}
          </Text>
        </Flex>
        <Flex justifyContent="space-between" mb="5px">
          <Text fontSize={['13px', '', '16px']} color="rgb(240, 185, 11)">
            Gas Fee:
          </Text>
          <Text fontSize={['13px', '', '16px']} color="#fafafa">
            {gasFee || '--'} {currency?.code}
          </Text>
        </Flex>
        <Flex justifyContent="space-between" mb="5px">
          <Text fontSize={['13px', '', '16px']} color="rgb(240, 185, 11)">
            Estimated Time:
          </Text>
          <Text fontSize={['13px', '', '16px']} color="#fafafa">
            60 seconds
          </Text>
        </Flex>
      </div>
      <Flex justifyContent="center" mt="24px">
        {approvalState !== ApprovalState.APPROVED &&
        currency.token_address !== '0x0000000000000000000000000000000000000000' ? (
          <Button width="100%" height="44px" onClick={handleApprove}>
            {loading && <LoadingIcon src="/images/loading.gif" alt="loading" />}
            Approve
          </Button>
        ) : (
          <Button
            width="100%"
            height="44px"
            disabled={loading}
            onClick={handleTransfer}
            style={{ position: 'relative', background: 'rgb(240, 185, 11)', color: '#000' }}
          >
            {loading && <LoadingIcon src="/images/loading.gif" alt="loading" />}
            Confirm
          </Button>
        )}
      </Flex>
    </TransferContentStyled>
  )
}

const LoadingIcon = styled('img')`
  width: 30px;
  height: 30px;
  position: absolute;
  left: 15px;
`

const TransferSuccessContentStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  > img {
    width: 300px;
    height: 300px;
  }
`

export const TransferSuccessContent = ({ onDismiss }) => {
  return (
    <TransferSuccessContentStyled>
      <img src="/images/tick-success.png" alt="" />
      <Text color="rgb(240, 185, 11)" m={['32px 0 16px', , '64px 0 16px']} bold fontSize={[20, , 24]}>
        Transfer successfully!
      </Text>
      <Flex width="100%">
        <Button width="100%" onClick={onDismiss} style={{ background: 'rgb(240, 185, 11)', color: '#000' }}>
          Done
        </Button>
      </Flex>
    </TransferSuccessContentStyled>
  )
}

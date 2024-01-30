import { useContractStaking } from 'hooks/useContract'
import { useEffect, useState } from 'react'

interface StakingConditionType {
  projectFee?: number
}

function useContractStakingConditions(): StakingConditionType {
  const [stakingConditions, setStakingConditions] = useState<StakingConditionType>({
    projectFee: undefined,
  })
  const contractStaking = useContractStaking(undefined, false)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      if (contractStaking) {
        contractStaking
          .PROJECT_FEE()
          .then((res) => res.toString())
          .then((result) => {
            setStakingConditions({ projectFee: +result })
          })
      }
    })()
  }, [contractStaking])
  return stakingConditions
}

export default useContractStakingConditions

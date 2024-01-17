import styled from 'styled-components'

const WInputCustom = styled.div`
  width: 100%;
  height: 42px;
  padding: 10px 12px;
  background: #eefbff;
  border-radius: 12px;
  border: 1px solid #3fbdbe;
  outline: unset;

  display: flex;
  flex-direction: row;
  align-items: center;

  input {
    width: 100%;
    background: unset;
    border: unset;
    outline: unset;
  }
`

const StakingInput: React.FC<{ wProps?: any; onChange?: (v: any) => void; [t: string]: any }> = ({
  rightNode,
  onChange,
  wProps,
  ...props
}) => {
  return (
    <WInputCustom {...wProps}>
      <input onChange={(e) => onChange && onChange(e.target.value)} {...props} />
      {rightNode}
    </WInputCustom>
  )
}

StakingInput.defaultProps = {
  onChange: () => null,
}
export default StakingInput

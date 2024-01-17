import styled from 'styled-components'

export const EmptyStyled = styled.div`
  width: 100%;
  min-height: 200px;
  padding: 24px;
  background: #eefbff;
  border: 1px solid rgba(67, 108, 255, 0.3);
  border-radius: 24px;

  display: flex;
  align-items: center;
  justify-content: center;
`
interface Props {
  label?: string
  [t: string]: any
}
const Empty: React.FC<Props> = ({ label, ...props }) => {
  return <EmptyStyled {...props}>{label || 'Empty'}</EmptyStyled>
}

export default Empty

import styled from 'styled-components'

const CustomEndLineStyled = styled.div<{ maxWidth: string; height: string }>`
  width: 100%;
  height: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
  height: ${({ height }) => height};
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  margin-top: 32px;
`

const CustomEndLine = ({ maxWidth = '400px', height = '6px' }) => {
  return <CustomEndLineStyled maxWidth={maxWidth} height={height} />
}

export default CustomEndLine

import styled from 'styled-components'

export const Lista = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
  row-gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

import styled, { keyframes } from 'styled-components'

const loader = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const StyledLoader = styled.span`
  font-size: 1.4rem;
  width: 80px;
  height: 80px;
  border: 8px solid var(--beige);
  border-bottom-color: transparent;
  border-radius: 50%;
  margin: 200px auto 0px;
  display: inline-block;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${loader} 2s linear infinite;
`

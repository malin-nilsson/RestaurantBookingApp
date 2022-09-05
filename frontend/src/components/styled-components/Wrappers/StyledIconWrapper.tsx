import styled from 'styled-components'

// Icons used in /contact
export const StyledIconWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  margin-top: 30px;
  height: 40px;

  .socialmedia {
    height: 100%;
    cursor: pointer;
    transition: scale 0.15s ease-in-out;
  }

  .socialmedia:hover {
    scale: 1.15;
  }
`

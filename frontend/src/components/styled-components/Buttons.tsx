import styled from "styled-components";

export const FeedBtn = styled.button`
  display: flex;
  justify-content: center;
  text-align: center;
  width: auto;
  margin: auto;
  font-size: 1rem;
  font-weight: 400;
  border: none;
  outline-style: none;
  background-color: var(--signal);
  color: var(--white);
  text-transform: uppercase;
  text-indent: 0.3rem;
  letter-spacing: 0.3rem;
  padding: 0.7rem;
  cursor: pointer;
  &:hover {
    transform: scale(0.98);
  }
`;

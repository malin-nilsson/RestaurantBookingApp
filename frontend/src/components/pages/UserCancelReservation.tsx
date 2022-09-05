import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { StyledMediumHeading } from '../styled-components/Headings/StyledHeadings'
import { StyledFlexDiv } from '../styled-components/Wrappers/StyledFlex'
import axios from 'axios'
import { useState } from 'react'

export default function UserCancelReservation() {
  const [showConfirm, setShowConfirm] = useState<Boolean>(true)

  const { id } = useParams()

  return (
    <div>
      <StyledFlexDiv padding="200px 100px">
        {showConfirm ? (
          <StyledMediumHeading>
            Are you sure you want to cancel your reservation?
          </StyledMediumHeading>
        ) : (
          <StyledMediumHeading>
            Your reservation has been cancelled.
          </StyledMediumHeading>
        )}

        <CancelWrapper>
          <Link to="/">Back home</Link>
          {showConfirm ? (
            <button
              onClick={async () => {
                console.log(showConfirm)
                axios.delete('http://localhost:4000/bookings/cancel/' + id)
                setShowConfirm(!showConfirm)
              }}
            >
              Confirm
            </button>
          ) : null}
        </CancelWrapper>
      </StyledFlexDiv>
    </div>
  )
}

const CancelWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 40px;
  align-items: center;
  font-size: 1.8rem;
  font-family: var(--headingfont);
  color: var(--beige);
  a {
    text-decoration: none;
    outline: none;
    color: var(--beige);
    border: 1px solid var(--beige);
    background-color: var(--green);
    padding: 10px 20px 10px 20px;
    transition: all 0.25s ease-in-out;
    &:hover {
      background-color: var(--beige);
      color: var(--green);
    }
  }
  button {
    background-color: var(--green);
    color: var(--beige);
    border: none;
    &:hover {
    }
  }
`

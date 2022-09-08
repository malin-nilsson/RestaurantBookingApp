import { useState } from 'react'
// AXIOS //
import axios from 'axios'
// REACT ROUTER //
import { Link, useParams } from 'react-router-dom'
// STYLED COMPONENTS //
import styled from 'styled-components'
import { StyledMediumHeading } from '../styled-components/Headings/StyledHeadings'
import { StyledFlexDiv } from '../styled-components/Wrappers/StyledFlex'
import { StyledButton } from '../styled-components/Buttons/StyledButtons'

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
          <>
            <StyledMediumHeading padding="0px 0px 20px">
              Your reservation has been cancelled.
            </StyledMediumHeading>
            <Link to="/">
              {' '}
              <StyledButton>Go back</StyledButton>
            </Link>
          </>
        )}

        <CancelWrapper>
          {showConfirm ? (
            <StyledButton
              onClick={async () => {
                axios.delete('http://localhost:4000/bookings/cancel/' + id)
                setShowConfirm(!showConfirm)
              }}
            >
              {' '}
              Yes, cancel my reservation
            </StyledButton>
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
`

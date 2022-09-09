// REACT ROUTER //
import { Link } from "react-router-dom";
// MODELS //
import { IBooking } from "../models/IBooking";
// STYLED COMPONENTS //
import { StyledButton } from "./styled-components/Buttons/StyledButtons";
import { StyledSmallHeading } from "./styled-components/Headings/StyledHeadings";
import { StyledConfirmationWrapper } from "./styled-components/Wrappers/StyledConfirmationWrapper";
import { StyledFlexDiv } from "./styled-components/Wrappers/StyledFlex";

interface IConfirmationProps {
  specificBooking: IBooking;
  padding: string;
  width: string;
  message?: string | undefined;
  buttonURL: string;
}
export default function BookingConfirmation(props: IConfirmationProps) {
  return (
    <StyledFlexDiv padding={props.padding}>
      <StyledConfirmationWrapper width={props.width}>
        <StyledSmallHeading
          fontSize="3rem"
          fontWeight="100"
          padding="10px 0px 20px"
        >
          Booking Confirmed
        </StyledSmallHeading>
        <span className="material-symbols-outlined">restaurant_menu</span>
        <StyledSmallHeading padding="15px 0px 20px">
          <span id="booking-information">
            {props.specificBooking.date}, {props.specificBooking.time}:00 pm
          </span>
        </StyledSmallHeading>
        <StyledSmallHeading padding="10px 0px">
          <span id="confirmation">
            A booking confirmation has been sent to{" "}
            {props.specificBooking.guest.email}.
          </span>
        </StyledSmallHeading>
        <StyledSmallHeading padding="10px 0px 20px">
          <span>{props.message ? props.message : ""}</span>
        </StyledSmallHeading>

        <StyledFlexDiv>
          <Link to={props.buttonURL}>
            <StyledButton margin="20px 0px 0px">Back Home</StyledButton>
          </Link>
        </StyledFlexDiv>
      </StyledConfirmationWrapper>
    </StyledFlexDiv>
  );
}

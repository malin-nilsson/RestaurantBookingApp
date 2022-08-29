import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { devices } from '../../styling-breakpoints/breakpoints/Breakpoints'
import { StyledPlantIcon } from '../Icon/StyledPlantIcon'

export default function Navbar() {
  const [isActive, setIsActive] = useState<Boolean>(false)

  const toggleMobileMenu = () => {
    setIsActive((isActive) => !isActive)
  }

  return (
    <>
      <StyledPlantIcon>
        <Link to="/">
          <img src="/assets/logo.png"></img>
        </Link>
      </StyledPlantIcon>

      <StyledNavbar className={isActive ? 'mobile-menu' : ''}>
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          {isActive ? (
            <span className="material-symbols-outlined">close</span>
          ) : (
            <span className="material-symbols-outlined">menu</span>
          )}
        </div>

        <ul
          style={{
            display: isActive && 'flex',
            flexDirection: isActive && 'column',
            gap: isActive && '15px',
            marginTop: isActive && '20px',
          }}
          className={isActive ? 'mobile-menu' : ''}
        >
          <li className="hover-effect">
            <NavLink
              to="/reservations"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
              onClick={() => (isActive ? toggleMobileMenu() : '')}
            >
              Reservations
            </NavLink>
          </li>
          <li className="hover-effect">
            <NavLink
              to="/menu"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
              onClick={() => (isActive ? toggleMobileMenu() : '')}
            >
              Menu
            </NavLink>
          </li>
          <li className="hover-effect">
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
              onClick={() => (isActive ? toggleMobileMenu() : '')}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </StyledNavbar>
    </>
  )
}

const StyledNavbar = styled.nav`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: var(--headingfont);
  position: relative;
  z-index: 3;
  background-color: var(--green);
  border-bottom: 1px solid var(--beige);

  @media ${devices.desktop} {
    flex-direction: row;
    position: fixed;
    width: 100%;
    background-color: unset;
    border-bottom: unset;
  }

  ul {
    display: none;
    list-style: none;
    padding: 0;
    margin: 0;

    @media ${devices.desktop} {
      display: flex;
      gap: 80px;
    }

    li a {
      color: var(--beige);
      text-decoration: none;
      font-size: 3rem;
      font-weight: 500;

      @media ${devices.desktop} {
        font-size: 1.4rem;
        letter-spacing: 0.2rem;
      }
    }
  }

  // STYLING FOR ACTIVE LINK
  .active-link {
    border-bottom: 1px solid var(--beige);
  }

  // LINK HOVER EFFECT
  .hover-effect {
    padding: 0px 0px 1px;
    display: inline-block;
    position: relative;
    color: var(--beige);
    font-weight: 600;
    font-size: 1.1rem;
    text-transform: uppercase;
    text-decoration: none;

    &:after {
      content: '';
      position: absolute;
      width: 100%;
      transform: scaleX(0);
      height: 1px;
      bottom: 0;
      left: 0;
      background-color: var(--beige);
      transform-origin: bottom right;
      transition: transform 0.3s ease-out;
    }

    &:hover:after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }

  // MOBILE MENU STYLING
  .mobile-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0px;

    li {
      margin: 10px 0px;
    }
  }

  .mobile-menu-icon {
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
    width: 100%;

    .material-symbols-outlined {
      font-size: 4rem;
    }

    @media ${devices.desktop} {
      display: none;
    }
  }
`

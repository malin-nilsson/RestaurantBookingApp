import { NavLink, Outlet } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './styled-components/Navbar/StyledNavbar'

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet></Outlet>
      </main>
    </>
  )
}

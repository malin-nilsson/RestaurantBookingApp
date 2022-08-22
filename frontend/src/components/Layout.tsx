import { Outlet } from 'react-router-dom'
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

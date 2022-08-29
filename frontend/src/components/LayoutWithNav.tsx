import { Outlet } from 'react-router-dom'
import Navbar from './styled-components/Navbar/StyledNavbar'

export default function LayoutWithNav() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet></Outlet>
      </main>
    </>
  )
}

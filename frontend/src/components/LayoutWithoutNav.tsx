import { Outlet } from 'react-router-dom'
import AdminHeader from './styled-components/Navbar/StyledAdminNavbar'
import Navbar from './styled-components/Navbar/StyledNavbar'

export default function LayoutWithoutNav() {
  return (
    <>
      <AdminHeader />
      <main>
        <Outlet></Outlet>
      </main>
    </>
  )
}

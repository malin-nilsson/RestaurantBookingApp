import { Outlet } from 'react-router-dom'
import AdminHeader from './styled-components/Navbar/StyledAdminNavbar'

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

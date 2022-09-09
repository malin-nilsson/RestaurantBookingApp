import axios from 'axios'
import { error } from 'console'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../../context/AdminContext'
import { IAdmin } from '../../models/IAdmin'
import { deleteAdmins } from '../../services/adminService'

import AdminPermission from '../admin-components/AdminPermission'
import { StyledAdminButton } from '../styled-components/Buttons/StyledButtons'
import {
  StyledMediumHeading,
  StyledSmallHeading,
} from '../styled-components/Headings/StyledHeadings'
import { StyledFlexDiv } from '../styled-components/Wrappers/StyledFlex'

export default function AdminManage() {
  const navigate = useNavigate()

  let adminDb = useContext(AdminContext)

  const [cookies, setCookie, removeCookie] = useCookies(['jwt'])
  const [isAdmin, setIsAdmin] = useState(false)
  const [usersDb, setUsersDb] = useState<IAdmin[]>([])
  const [changeRole, setChangeRole] = useState({
    admin: 'admin',
    user: 'user',
  })

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate('/admin')
      } else {
        const { data } = await axios.post(
          'http://localhost:4000/admin',
          {},
          {
            withCredentials: true,
          },
        )
        if (data.role === 'user') {
          console.log(data.user)
        } else {
          if (data.role === 'admin') {
            setIsAdmin(true)
            const data = await axios.get('http://localhost:4000/admin/manage')

            setUsersDb(data.data)
          }
        }
      }
    }

    verifyUser()
  }, [cookies, navigate, removeCookie])

  const deleteFromList = async (admin: IAdmin) => {
    try {
      const res = await axios.delete(
        'http://localhost:4000/admins/manage/' + admin._id,
      )
      if (res.data.success) {
        deleteAdmins(admin)
        alert(res.data.msg)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      {isAdmin ? (
        <StyledFlexDiv>
          <StyledMediumHeading padding="2rem" margin="20px 0px">
            Users
          </StyledMediumHeading>
          {usersDb.map((admins) => {
            return (
              <StyledFlexDiv key={admins.email} gap="0px">
                <StyledSmallHeading fontSize="1.9rem">
                  <span>User: {admins.email} </span>
                  <span>Role: {admins.role} </span>
                </StyledSmallHeading>
                <StyledFlexDiv direction="row" gap="20px">
                  <StyledAdminButton onClick={(e) => deleteFromList(admins)}>
                    Delete User
                  </StyledAdminButton>
                  <StyledAdminButton
                    onSubmit={(e: ChangeEvent<HTMLButtonElement>) => {
                      setChangeRole({
                        ...changeRole,
                        [e.target.name]: e.target.value,
                      })
                    }}
                  >
                    Change Role
                  </StyledAdminButton>
                </StyledFlexDiv>
              </StyledFlexDiv>
            )
          })}
        </StyledFlexDiv>
      ) : (
        <AdminPermission></AdminPermission>
      )}
    </>
  )
}

import axios from "axios";
import { values } from "cypress/types/lodash";
import { ChangeEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { IAdmin } from "../../models/IAdmin";

import AdminPermission from "../admin-components/AdminPermission";
import { StyledAdminButton } from "../styled-components/Buttons/StyledButtons";
import {
  StyledMediumHeading,
  StyledSmallHeading,
} from "../styled-components/Headings/StyledHeadings";
import { StyledFlexDiv } from "../styled-components/Wrappers/StyledFlex";

export default function AdminManage() {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [usersDb, setUsersDb] = useState<IAdmin[]>([]);
  const [changeRole, setChangeRole] = useState({
    admin: "admin",
    user: "user",
  });

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/admin");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000/admin",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/admin");
        } else {
          if (data.role === "user") {
            setIsAdmin(false);
            return <AdminPermission />;
          } else {
            // LOGIC FOR SHOW & CHANGE USERS / ADMINS
            if (data.role === "admin") {
              setIsAdmin(true);
              const data = await axios.get(
                "http://localhost:4000/admin/manage"

                // { withCredentials: false }
              );
              console.log(data);
              setUsersDb(data.data);
            }
          }
        }
      }
    };

    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const handleChange = async (e: ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // const { data } = await axios.post(
    //   "http://localhost:4000/admin/register",
    //   {
    //     ...changeRole,
    //   },
    //   {
    //     withCredentials: true,
    //   }
    // );
    // if (data) {
    //   changeRole.admin = !changeRole.user
    // }
  };

  return (
    <>
      {isAdmin ? (
        <StyledFlexDiv>
          <StyledMediumHeading padding="2rem">USERS LIST</StyledMediumHeading>
        </StyledFlexDiv>
      ) : (
        <AdminPermission></AdminPermission>
      )}
      {usersDb.map((admins) => {
        return (
          <StyledFlexDiv key={admins.email}>
            <StyledSmallHeading>
              User: {admins.email} - Role: {admins.role}
            </StyledSmallHeading>
            <StyledFlexDiv direction="row">
              <StyledAdminButton>Delete User</StyledAdminButton>
              <StyledAdminButton
                onSubmit={(e: ChangeEvent<HTMLButtonElement>) => {
                  setChangeRole({
                    ...changeRole,
                    [e.target.name]: e.target.value,
                  });
                }}
              >
                Change Role
              </StyledAdminButton>
            </StyledFlexDiv>
          </StyledFlexDiv>
        );
      })}
    </>
  );
}

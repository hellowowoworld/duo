import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Logout onClick={() => logout({ returnTo: "http://localhost:3000/login" })}>
      Log Out
    </Logout>
  );
};

export default LogoutButton;

const Logout = styled.button`
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.5em 1em;
  border-radius: 10px;
  border: none;
  margin: 1em;
`;

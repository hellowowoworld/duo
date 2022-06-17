import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <LoginB onClick={() => loginWithRedirect()}>Log In</LoginB>;
};

export default LoginButton;

const LoginB = styled.button`
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.87);
  color: white;
  padding: 1em 2em;
  border-radius: 10px;
  border: none;
  margin: 1em;
`;

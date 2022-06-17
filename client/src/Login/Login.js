import LoginButton from "./LoginButton";
import Entrance from "./Entrance";
import styled from "styled-components";

import { InfoCard } from "./Infocard";

import { useState } from "react";

const Login = () => {
  const [index, setIndex] = useState(0);
  const textArr = [
    "Came to play?",
    "But still looking for a LOLmate?",
    "Login and start swiping",
    "Match faster than you can queue XD",
  ];
  const handleRight = () => {
    if (index <= textArr.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };
  const handleLeft = () => {
    if (index >= 1) {
      setIndex(index - 1);
    } else {
      setIndex(textArr.length - 1);
    }
  };
  return (
    <>
      <Entrance />
      <LoginWrapper>
        <InfoCard
          text={textArr[index]}
          handleRight={handleRight}
          handleLeft={handleLeft}
        />
        <LoginButton />
      </LoginWrapper>
    </>
  );
};

export default Login;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  bottom: 56px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
`;

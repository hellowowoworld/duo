import styled from "styled-components";
import { useState } from "react";
const Entrance = () => {
  const [style, setStyle] = useState({ opacity: 1 });
  setTimeout(() => {
    setStyle({ opacity: 0, zIndex: -1 });
  }, 2000);
  return (
    <>
      <Wrapper style={style}></Wrapper>
    </>
  );
};

export default Entrance;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  z-index: 500;
  background-color: rgb(207, 2, 28);
  height: 100vh;
  width: 100vw;
  transition: 2s;
  background-image: url("https://res.cloudinary.com/duoimg/image/upload/v1654792589/Logo/Screen_Shot_2022-06-09_at_12.35.20_PM_pfifij.png");
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
`;

const LogoName = styled.span`
  color: white;
  font-size: 6em;
  font-weight: 400;
`;
const Logo = styled.span`
  color: white;
  font-weight: 400;
  transition-duration: 0.4s;
`;

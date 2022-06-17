import styled from "styled-components";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

export const InfoCard = ({ text, handleLeft, handleRight }) => {
  return (
    <>
      <InfoCardContent>
        <img src="https://res.cloudinary.com/duoimg/image/upload/v1654792589/Logo/Screen_Shot_2022-06-09_at_12.35.20_PM_pfifij.png" />
        <ContentWrapper>
          <ButtonLeft onClick={handleLeft}>
            <ArrowCircleLeftIcon />
          </ButtonLeft>
          <TextWrapper>{text}</TextWrapper>
          <ButtonRight onClick={handleRight}>
            <ArrowCircleRightIcon />
          </ButtonRight>
        </ContentWrapper>
      </InfoCardContent>
    </>
  );
};
const InfoCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  width: 450px;
  height: 50vh;
  background-color: rgb(207, 2, 28);
  color: white;
  z-index: 1;
  margin: 2em;
  font-size: 24px;
  img {
    position: relative;
    top: -30px;
    width: 40%;
  }
`;
const TextWrapper = styled.div`
  text-align: center;
  padding: 1em;
  width: 200px;
  height: 150px;
`;
const ButtonLeft = styled.button`
  background-color: black;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 0.1em;
  height: 50px;
  width: 50px;
  margin: 1em;
`;
const ButtonRight = styled.button`
  background-color: black;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 0.1em;
  height: 50px;
  width: 50px;
  margin: 1em;
`;
const ContentWrapper = styled.div`
  display: flex;
  align-items: space-between;
`;

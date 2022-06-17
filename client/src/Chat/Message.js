import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../UserContext";
const Message = ({ message, author, recipient }) => {
  const { currentUserInfo } = useContext(UserContext);
  console.log(currentUserInfo, author, recipient, message);
  console.log(author === currentUserInfo.summonerName);
  return (
    <>
      <li>
        {author === currentUserInfo.summonerName ? (
          <MessageWrapper author={true}>
            <TextWrapper author={true}>{message}</TextWrapper>
          </MessageWrapper>
        ) : (
          <MessageWrapper author={false}>
            <TextWrapper author={false}>{message}</TextWrapper>
          </MessageWrapper>
        )}
      </li>
    </>
  );
};

export default Message;

const MessageWrapper = styled.div`
  display: flex;
  justify-content: ${(props) => (props.author ? "flex-end" : "flex-start")};
  width: 100%;
  padding: 1em;
`;
const TextWrapper = styled.div`
  background-color: ${(props) => (props.author ? "lightgreen" : "lightblue")};
  border: none;
  border-radius: 10px;
  padding: 0.3em 0.6em;
`;

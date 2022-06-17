import { UserContext } from "../UserContext";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Profile from "../Profile/Profile";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Chat from "../Chat/Chat";

const Matches = () => {
  const { currentUserInfo, user, summonerName, setSummonerName, profiles } =
    useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [recipient, setRecipient] = useState(
    currentUserInfo.matches[0].summonerName
  );
  const [messageData, setMessageData] = useState([]);
  if (currentUserInfo) {
    console.log(currentUserInfo.summonerName, recipient);
  }
  const fetchMessages = async (author, recipient) => {
    console.log(author, recipient);
    await fetch(`api/chat/${author}/${recipient}`)
      .then(async (res) => await res.json())
      .then(async (data) => setMessageData(await data.data[0].messages));
  };
  const handleClick = (e) => {
    setOpen((prev) => !prev);
    e.stopPropagation();
  };

  const handleClickAway = () => {
    setOpen(false);
  };
  return (
    <>
      {currentUserInfo.matches ? (
        <MatchesWrapper>
          <PeopleWrapper>
            {currentUserInfo.matches.map((element, i) => {
              return (
                <>
                  <StackWrapper
                    key={i}
                    id={element._id}
                    onClick={() => {
                      setRecipient(element.summonerName);
                      fetchMessages(currentUserInfo.summonerName, recipient);
                    }}
                  >
                    <Stack direction="row" spacing={1} key={i}>
                      <Avatar
                        alt={element.name}
                        src={element.photos[0]}
                        onClick={handleClick}
                      />
                      <InfoWrapper>
                        <Name>{element.name}</Name>
                      </InfoWrapper>
                    </Stack>
                  </StackWrapper>
                  {open && (
                    <ClickAwayListener
                      mouseEvent="onMouseDown"
                      touchEvent="onTouchStart"
                      onClickAway={handleClickAway}
                    >
                      <ProfilePopup>
                        <Profile player={element} />
                      </ProfilePopup>
                    </ClickAwayListener>
                  )}
                </>
              );
            })}
          </PeopleWrapper>
          <ChatWrapper>
            <Chat
              recipient={recipient}
              fetchMessages={fetchMessages}
              messageData={messageData}
              setMessageData={setMessageData}
            />
          </ChatWrapper>
        </MatchesWrapper>
      ) : (
        <MatchesWrapper>
          <div>Sorry, not matches yet :(</div>
        </MatchesWrapper>
      )}
    </>
  );
};

export default Matches;
const PeopleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  height: 100vh;
`;
const StackWrapper = styled.div`
  border-bottom: 1px solid black;
  padding: 1em;
`;
const ChatWrapper = styled.div`
  width: 70vw;
  height: 100vh;
  border-left: 1px solid grey;
`;
const MatchesWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  width: 100vw;
  height: 100vh;
`;
const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const Name = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const ConvoPreview = styled.div`
  font-size: 10pt;
  display: flex;
  align-items: center;
  text-align: right;
  width: 50%;
`;
const ProfilePopup = styled.div`
  position: absolute;
  margin-left: 40vw;
  margin-right: auto;
  width: 450px;
  top: 100px;
  z-index: 500;
`;

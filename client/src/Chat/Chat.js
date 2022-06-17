import styled from "styled-components";

import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import Message from "./Message";

const Chat = ({ recipient, fetchMessages, messageData, setMessageData }) => {
  const { currentUserInfo } = useContext(UserContext);
  // const socket = io();
  // const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   const newSocket = io(`http://localhost:3000`);
  //   setSocket(newSocket);
  //   return () => newSocket.close();
  // }, [setSocket]);
  const [text, setText] = useState("");

  const updateConversation = async (message) => {
    const { author, text, recipient } = message;
    try {
      await fetch(`/api/profile/${author}/updateChat`, {
        method: "PATCH",
        body: JSON.stringify({
          user1: author,
          user2: recipient,
          message: text,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then(async (res) => await res.json())
        .then((data) => {
          console.log(data);
          setText("");
          fetchMessages(author, recipient);
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchMessages(currentUserInfo.summonerName, recipient);
  }, [recipient]);

  const handleText = (e) => {
    setText(e.target.value);
  };
  const handleSend = (e) => {
    e.preventDefault();

    const message = {
      author: currentUserInfo.summonerName,
      text: text,
      recipient: recipient,
    };
    updateConversation(message);
  };

  return (
    <>
      <ChatWrapper>
        <ul>
          {messageData !== [] &&
            messageData.map((element, i) => (
              <Message
                key={i}
                message={element.message}
                author={element.author}
                recipient={element.recipient}
              />
            ))}
        </ul>
      </ChatWrapper>
      <Form>
        <input type="text" value={text} onChange={handleText} />
        <button onClick={handleSend}>Send</button>
      </Form>
    </>
  );
};

export default Chat;
const ChatWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 300px;
  height: 100vh;
  width: 70vw;
  overflow-y: scroll;
  ul {
    overflow-y: scroll;
  }
`;
const Form = styled.form`
  background-color: rgba(0, 0, 0, 0.87);
  padding: 0.3em;
  position: fixed;
  bottom: 56px;
  display: flex;
  width: 70vw;

  input {
    flex-grow: 1;
    border: none;
    border-radius: 0.2em;
    padding-left: 0.5em;
    &:focus {
      outline: none;
    }
  }
  button {
    border-radius: 20px;
    padding: 0.25em 0.5em;
    font-size: 16pt;
    margin: 0 0.5em;
    border: none;
  }
`;
// import { useEffect, useState } from "react";
// import socketClient from "socket.io-client";
// import { ChannelList } from "./ChannelList";
// import { MessagePanel } from "./MessagePanel";

// const Chat = () => {
//   const SERVER = "http://127.0.0.1:8000";
//   const socket = socketClient(SERVER);
//   const [channels, setChannels] = useState([
//     { i: 1, id: "Moh", name: "first" },
//   ]);
//   const [channel, setChannel] = useState();
//   socket.on("connection", () => {
//     console.log(`I'm connected with the back-end`);
//   });
//   const loadChannels = async () => {
//     await fetch("http://localhost:8000/getChannels").then(async (response) => {
//       let data = await response.json();
//       console.log(data);
//       setChannels(data.channels);
//     });
//   };
//   console.log(channels);
//   const handleChannelSelect = (id) => {
//     let selectedChannel = channels.find((c) => {
//       return c.id === id;
//       setChannel(selectedChannel);
//     });
//   };
//   const handleSendMessage = (channel_id, text) => {
//     socket.emit("send-message", {
//       channel_id,
//       text,
//       senderName: channel_id,
//       id: Date.now(),
//     });
//   };
//   useEffect(() => {
//     loadChannels();
//   }, []);
//   return (
//     <>
//       <div className="chat-app"></div>‍
//       <ChannelList
//         channels={channels}
//         onSelectChannel={handleChannelSelect}
//       ></ChannelList>
//       <MessagePanel onSendMessage={handleSendMessage} />
//     </>
//   );
// };

// export default Chat;

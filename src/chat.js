import React, { useState, useEffect } from 'react'
import "./chat.css"
import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import {AttachFile, MoreVert} from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom"
import db from "./firebase";
import { collection, doc, onSnapshot, query, orderBy,addDoc, serverTimestamp } from 'firebase/firestore';
import { useStateValue } from './StateProvider';

function Chat(){
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();

  // everytime room id changes the room messages are produced
  useEffect(() => {
    if (roomId) {
      const roomRef = doc(db, 'rooms', roomId);
      const messagesRef = collection(roomRef, 'messages');

      const unsubscribeRoom = onSnapshot(roomRef, (snapshot) => {
        setRoomName(snapshot.data().name);
      });

      const querySnapshot = query(messagesRef, orderBy('timestamp', 'asc'));
      const unsubscribeMessages = onSnapshot(querySnapshot, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });

      return () => {
        unsubscribeRoom();
        unsubscribeMessages();
      };
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random()*5000))
  }, [roomId]);

  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   console.log("You type >>> ", input)
  //   db.collection("rooms").doc(roomId).collection("messages").add({
  //     message: input,
  //     name: user.displayName,
  //     timestamp: serverTimestamp(),
  //   })
  //   setInput("");
  // };

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log("You type >>> ", input);
    try {
      const messageRef = collection(doc(db, 'rooms', roomId), 'messages');
      await addDoc(messageRef, {
        message: input,
        name: user.displayName,
        timestamp: serverTimestamp(),
      });
      setInput("");
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const lastSeenDate = messages[messages.length - 1]?.timestamp?.toDate();
  const formattedLastSeenDate = lastSeenDate?lastSeenDate.toLocaleString() : 'N/A';

  return (
    <div className = "chat">
      <div className="chat_header">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className="chat_headerInfo">
        <h3>{roomName}</h3>
        <p>Last seen: {formattedLastSeenDate}</p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        {messages.map((message) => (
          <p className={`chat_message ${ message.name === user.displayName && "message_received"}`}>
          <span className="sender_name">{message.name}</span>
          {message.message}
          <span className="chat_timestamp">{message.timestamp && new Date(message.timestamp.toDate()).toLocaleString()}
          </span>
          </p>
        ))}
      </div>

      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form>
          <input
           value={input} 
           onChange={(e) => setInput(e.target.value)}
           placeholder="Type here to send a message..." 
           type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat
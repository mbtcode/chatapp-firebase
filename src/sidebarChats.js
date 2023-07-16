import React, { useEffect, useState } from 'react'
import "./sidebarChats.css"
import { Avatar} from "@material-ui/core";
import db from "./firebase";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { Link } from "react-router-dom";

function SidebarChats({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      const messagesRef = collection(db, "rooms", id, "messages");
      const querySnapshot = query(messagesRef, orderBy("timestamp", "desc"));
      const unsubscribe = onSnapshot(querySnapshot, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });

      return () => {
        unsubscribe();
      };
    }
  }, [id]);
  

  useEffect(() => {
    setSeed(Math.floor(Math.random()*5000))
  }, []);

  // Create chat using async function to create a new document in firebase
  const createChat = () => {
    const roomName = prompt("Please enter a name for the chat:");
    if (roomName) {
      const addRoom = async () => {
        try {
          await addDoc(collection(db, "rooms"), {
            name: roomName,
          });
        } catch (error) {
          // Handle any errors that occur during the document creation
          console.error("Error creating room:", error);
        }
      };
      addRoom();
    }
  }

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChats">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
          <div className="sidebarChats_info">
            <h2>{name}</h2>
            <p>{messages[0]?.message}</p>
          </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat}
     className="sidebarChats">
    <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChats
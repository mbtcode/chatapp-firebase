import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import "./chat.js";
import Sidebar from "./sidebar";
import Chat from "./chat";
import Login from "./Login.js"
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
    {!user ? (
      <Login />
    ) : (
      <div className="app_body">
      <Router>
        <Routes>
            <Route path="/rooms/:roomId" element={<AppLayout />} />
            <Route path="/" element={<AppLayout />} />
        </Routes>
      </Router>
      </div>
    )}
    </div>
  );
}

function AppLayout() {
  return (
    <>
      <Sidebar />
      <Chat />
    </>
  );
}

export default App;
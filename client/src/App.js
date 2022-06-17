import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Settings from "./Settings/Settings";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Profile from "./Profile/Profile";
import Matches from "./Matches/Matches";
import Chat from "./Chat/Chat";
import Error from "./Error/Error";
import Footer from "./Footer/Footer";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useEffect } from "react";
// import socketClient from "socket.io-client";

const App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { currentUserInfo } = useContext(UserContext);

  useEffect(() => {
    console.log(user, isAuthenticated, isLoading, currentUserInfo);
  }, [isAuthenticated, isLoading, user]);
  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <BrowserRouter>
        <GlobalStyles />

        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            exact
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />

          <Route
            path="/settings"
            element={user ? <Settings /> : <Navigate to="/login" />}
          />

          <Route path="/profile/:summonerName" element={<Profile />} />

          <Route
            path="/matches"
            element={user ? <Matches /> : <Navigate to="/login" />}
          />

          {/* <Route path="/chat/" element={<Chat />} /> */}
          <Route path="*" element={<Error />} />
        </Routes>

        {user && <Footer />}
      </BrowserRouter>
    );
  }
};

export default App;

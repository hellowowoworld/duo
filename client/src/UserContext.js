import { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext(null);
export const UserProvider = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [currentUserInfo, setCurrentUserInfo] = useState();
  const [profiles, setProfiles] = useState([]);
  const [summonerName, setSummonerName] = useState("");
  const [right, setRight] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const myRequest = new Request(`/api/profile/${user.sub}`);
      const response = await fetch(myRequest);
      const data = await response.json();
      const fetchedUserData = await data.data;
      console.log(fetchedUserData);
      if (fetchedUserData !== {}) {
        setSummonerName(await fetchedUserData.summonerName);
        setCurrentUserInfo(await fetchedUserData);
      }
      if (user)
        try {
          fetchUserProfile();
          console.log(user);
        } catch (err) {
          console.log(err);
        }
    };
  }, [user, right]);
  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await fetch("/api/profiles");
      const data = await response.json();
      const profileArr = await data.data.filter((element) => {
        if (element.summonerName !== currentUserInfo.summonerName)
          return element;
      });
      setProfiles(await profileArr);
    };
    user && fetchProfiles();
  }, [currentUserInfo]);
  return (
    <>
      <UserContext.Provider
        value={{
          currentUserInfo,
          setCurrentUserInfo,
          summonerName,
          setSummonerName,
          profiles,
          setProfiles,
          user,
          right,
          setRight,
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
};

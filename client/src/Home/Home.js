import Profile from "../Profile/Profile";
import styled from "@emotion/styled";
import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import TinderCard from "react-tinder-card";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Home = () => {
  const {
    currentUserInfo,
    user,
    right,
    setRight,
    summonerName,
    setSummonerName,
    profiles,
    setCurrentUserInfo,
  } = useContext(UserContext);
  console.log(currentUserInfo);

  const [currentIndex, setCurrentIndex] = useState(profiles.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex);
  const [currentProfile, setCurrentProfile] = useState(profiles[currentIndex]);

  // useEffect(() => {
  //   currentValue && console.log(currentProfile);
  // }, [currentProfile, profiles]);
  const fetchUserProfile = async (userInfo) => {
    const myRequest = new Request(`/api/profile/${userInfo}`);
    try {
      const response = await fetch(myRequest);
      const data = await response.json();
      const fetchedUserData = await data.data;

      if (await fetchedUserData.preferences) {
        setCurrentUserInfo(fetchedUserData);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    try {
      fetchUserProfile(user.sub);
    } catch (err) {
      console.log(err);
    }
  }, [user]);
  let filteredProfiles = [];
  const filterForCommonElements = (arr1, arr2) => {
    return arr1.some((item) => arr2.includes(item));
  };
  if (currentUserInfo) {
    filteredProfiles = profiles
      .filter((player) => {
        if (player._id !== user.sub) {
          return player;
        }
      })
      .filter((player) => {
        if (
          !player.potentialMatches.some((element) => element._id === user.sub)
        ) {
          return player;
        }
      })
      .filter((player) => {
        if (
          currentUserInfo.region === player.region &&
          (filterForCommonElements(
            currentUserInfo.preferences.positions,
            player.positions
          ) ||
            filterForCommonElements(
              currentUserInfo.preferences.schedule,
              player.schedule
            ) ||
            filterForCommonElements(
              currentUserInfo.preferences.personality,
              player.personality
            ) ||
            currentUserInfo.preferences.playstyle.some(
              (style) => style === player.playstyle
            ) ||
            currentUserInfo.preferences.rank.some(
              (rank) => rank === player.rank
            ))
        ) {
          console.log(player);

          return player;
        }
      });
  }
  const childRefs = useMemo(
    () =>
      Array(filteredProfiles.length)
        .fill(0)
        .map((i) => React.createRef()),
    [profiles]
  );
  let currentValue = filteredProfiles.length - 1;
  const updateCurrentIndex = (val) => {
    // console.log(currentIndex);
    // console.log(val);
    // console.log(profiles[currentValue]);
    currentIndexRef.current = val - 1;
    setCurrentIndex(val - 1);
    currentValue = val - 1;
    // console.log(currentValue);
    // console.log(profiles);
    // console.log(profiles[currentValue]);
    setCurrentProfile(filteredProfiles[currentValue]);
  };
  const canGoBack = currentIndex < filteredProfiles.length - 1;
  const canSwipe = currentIndex >= 0;

  // const fetchUserProfile = async () => {
  //   const myRequest = new Request(`/api/profile/${user.sub}`);
  //   const response = await fetch(myRequest);
  //   const data = await response.json();
  //   const fetchedUserData = data.data;
  //   console.log(fetchedUserData);
  //   if (fetchedUserData !== null) {
  //     let usefulSummonerName = await fetchedUserData.summonerName;
  //     setSummonerName(await fetchedUserData.summonerName);
  //     return await usefulSummonerName;
  //   }
  // };

  const putPotentialMatch = async (profile) => {
    const info = currentUserInfo;
    console.log(profile.summonerName);
    const response = await fetch(`/api/profile/${profile.summonerName}/add`, {
      method: "PATCH",
      body: JSON.stringify({ info }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    console.log(data);
    console.log("done");
  };

  const addToPotentialMatches = async (direction) => {
    if (direction === "right") {
      await putPotentialMatch(filteredProfiles[currentValue]);
      setRight(!right);
    }
  };
  const swiped = (direction, nameToDelete, index) => {
    console.log(index);
    addToPotentialMatches(direction);
    setLastDirection(direction);

    updateCurrentIndex(index);
  };
  const swipe = async (dir) => {
    if (canSwipe && currentIndex < filteredProfiles.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };
  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  return (
    <>
      <HomeContainer>
        {filteredProfiles.map((player, index) => (
          <StyledCard
            id={player._id}
            ref={childRefs[index]}
            className="swipe"
            key={player._id}
            onSwipe={(dir) => swiped(dir, player.name, index)}
            onCardLeftScreen={() => outOfFrame(player.name, index)}
          >
            <Profile player={player} />
          </StyledCard>
        ))}
        {/* <ButtonWrapper>
          <ButtonLeft
            disabled={!canSwipe}
            onClick={() => {
              swipe("left");
            }}
          >
            <ArrowCircleLeftIcon />
            DODGE
          </ButtonLeft> */}
        {/* <Button
            disabled={!canGoBack}
            onClick={() => {
              goBack();
            }}
          >
            <SettingsBackupRestoreIcon />
          </Button> */}
        {/* <ButtonRight
            disabled={!canSwipe}
            onClick={() => {
              swipe("right");
            }}
          >
            QUEUE
            <ArrowCircleRightIcon />
          </ButtonRight>
        </ButtonWrapper> */}
      </HomeContainer>
    </>
  );
};

export default Home;

const HomeContainer = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.1);
  bottom: 56px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 850px;
  margin-left: auto;
  margin-right: auto;
  bottom: -200px;
  z-index: 500;
`;
const ButtonLeft = styled.button`
  background-color: red;
  border: none;
  border-radius: 20px;
  padding: 0.1em 0.5em;
`;
const ButtonRight = styled.button`
  background-color: green;
  border: none;
  border-radius: 20px;
  padding: 0.1em 0.5em;
`;

const StyledCard = styled(TinderCard)`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  width: 450px;
  top: 75px;
`;

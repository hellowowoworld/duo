import MultipleSelect from "./MultipleSelect";
import BasicSelect from "./BasicSelect";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import ImageUploader from "./ImageUploader";
import { useEffect, useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../UserContext";
import LogoutButton from "../Login/LogoutButton";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const { logout } = useAuth0();
  console.log(user);
  // Dropdown options
  const rankItems = [
    "Unranked",
    "Bronze",
    "Silver",
    "Gold",
    "Platinum",
    "Diamond",
    "Challenger",
  ];
  const regionItems = ["North America", "Europe", "Asia"];
  const playstyleItems = ["Aggressive", "Passive", "Bait"];
  const positionsItems = ["Top", "Jungle", "Mid", "ADC", "Support"];
  const scheduleItems = ["Weeknights", "Weekends", "Always On", "Occassional"];
  const personalityItems = [
    "The Silent One",
    "The Flamer",
    "FF @ 15",
    "5Head",
    "The Sheperd",
    "The Meta-Pioneer",
    '"Smurf"',
    "Actual Smurf",
    "One-Trick",
    "Just Having Fun",
  ];

  //Profile states

  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [playstyle, setPlaystyle] = useState("");
  const [positions, setPositions] = useState([]);
  const [bio, setBio] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [rank, setRank] = useState("");
  const [personality, setPersonality] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [clicked, setClicked] = useState(false);
  const { currentUserInfo, setCurrentUserInfo, summonerName, setSummonerName } =
    useContext(UserContext);
  console.log(currentUserInfo);
  const fetchUserProfile = async (userInfo) => {
    const myRequest = new Request(`/api/profile/${userInfo}`);
    try {
      const response = await fetch(myRequest);
      const data = await response.json();
      const fetchedUserData = await data.data;

      if (await fetchedUserData.preferences) {
        setCurrentUserInfo(fetchedUserData);
        setSummonerName(fetchedUserData.summonerName);
        setName(fetchedUserData.name);
        setRegion(fetchedUserData.region);
        setPlaystyle(fetchedUserData.playstyle);
        setBio(fetchedUserData.bio);
        setSchedule(fetchedUserData.schedule);
        setRank(fetchedUserData.rank);
        setPositions(fetchedUserData.positions);
        setPersonality(fetchedUserData.personality);
        setPrefPlaystyle(fetchedUserData.preferences.playstyle);
        setPrefPersonality(fetchedUserData.preferences.personality);
        setPrefRank(fetchedUserData.preferences.rank);
        setPrefSchedule(fetchedUserData.preferences.schedule);
        setPrefPositions(fetchedUserData.preferences.positions);
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

  // const formData = new FormData();
  // useEffect(() => {
  //   console.log([...formData]);
  //   console.log(...selectedFile);
  // }, [selectedFile]);

  const handleSummonerName = (e) => {
    setSummonerName(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleRegion = (e) => {
    setRegion(e.target.value);
  };
  const handlePlaystyle = (e) => {
    setPlaystyle(e.target.value);
  };
  const handlePositions = (e) => {
    setPositions(e.target.value);
  };
  const handleSchedule = (e) => {
    setSchedule(e.target.value);
  };
  const handleBio = (e) => {
    setBio(e.target.value);
  };
  const handleRank = (e) => {
    setRank(e.target.value);
    console.log(e.target.value);
  };
  const handlePersonality = (e) => {
    setPersonality(e.target.value);
  };

  // Match preferences

  const [prefPlaystyle, setPrefPlaystyle] = useState([]);
  const [prefPositions, setPrefPositions] = useState([]);
  const [prefSchedule, setPrefSchedule] = useState([]);
  const [prefRank, setPrefRank] = useState([]);
  const [prefPersonality, setPrefPersonality] = useState([]);
  const handlePrefPlaystyle = (e) => {
    setPrefPlaystyle(e.target.value);
  };
  const handlePrefPositions = (e) => {
    setPrefPositions(e.target.value);
  };
  const handlePrefSchedule = (e) => {
    setPrefSchedule(e.target.value);
  };
  const handlePrefRank = (e) => {
    setPrefRank(e.target.value);
  };
  const handlePrefPersonality = (e) => {
    setPrefPersonality(e.target.value);
  };

  //Other
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/api/profile/${summonerName}/update`, {
        method: "PATCH",
        body: JSON.stringify({
          _id: user.sub,
          summonerName: summonerName,
          name: name,
          positions: positions,
          rank: rank,
          region: region,
          schedule: schedule,
          playstyle: playstyle,
          personality: personality,
          photos: selectedFile,
          bio: bio,
          preferences: {
            positions: prefPositions,
            rank: prefRank,
            schedule: prefSchedule,
            playstyle: prefPlaystyle,
            personality: prefPersonality,
          },
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then(async (res) => await res.json())
        .then((data) => {
          console.log(data);
          setClicked(!clicked);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/api/profile/${summonerName}/create`, {
        method: "POST",
        body: JSON.stringify({
          _id: user.sub,
          summonerName: summonerName,
          name: name,
          positions: positions,
          rank: rank,
          region: region,
          schedule: schedule,
          playstyle: playstyle,
          personality: personality,
          photos: selectedFile,
          bio: bio,
          preferences: {
            positions: prefPositions,
            rank: prefRank,
            schedule: prefSchedule,
            playstyle: prefPlaystyle,
            personality: prefPersonality,
          },
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          navigate("/");
        });
    } catch (err) {
      console.log(err);
    }
  };
  const onFileSelect = (file) => {
    let copiedFile = [...selectedFile];
    copiedFile.push(file);
    setSelectedFile(copiedFile);
    // formData.append(`${summonerName}`, file);
  };
  const deleteHandler = async () => {
    try {
      await fetch(`/api/profile/${currentUserInfo.summonerName}/delete`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          logout({ returnTo: "http://localhost:3000/login" });
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = () => {
    if (window.confirm("Are you absolutely sure?")) {
      deleteHandler();
      console.log("deleted");
    }
  };
  return (
    <>
      <SettingsWrapper>
        <Form>
          <ImageUploader onFileSelect={onFileSelect} />
          <TextField
            margin="normal"
            fullWidth
            id="summonerName"
            label="Summoner Name"
            value={summonerName}
            helperText=""
            required
            onChange={handleSummonerName}
          />
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Your Name"
            value={name}
            helperText=""
            required
            onChange={handleName}
          />
          <TextField
            margin="normal"
            fullWidth
            id="bio"
            label="Bio"
            multiline
            rows={4}
            value={bio}
            onChange={handleBio}
          />

          <BasicSelect
            required
            value={rank}
            setValue={setRank}
            className="BasicSelect"
            fullWidth
            items={rankItems}
            selectId="rank"
            id="rankSelect"
            label="Rank"
            onChange={(e) => {
              handleRank(e);
            }}
          />
          <BasicSelect
            required
            value={region}
            setValue={setRegion}
            className="BasicSelect"
            items={regionItems}
            selectId="region"
            id="regionSelect"
            label="Region"
            onChange={handleRegion}
          />
          <BasicSelect
            required
            value={playstyle}
            setValue={setPlaystyle}
            className="BasicSelect"
            items={playstyleItems}
            selectId="playstyle"
            id="playstyleSelect"
            label="Playstyle"
            onChange={handlePlaystyle}
          />
          <MultipleSelect
            required
            value={positions}
            setValue={setPositions}
            items={positionsItems}
            select="positions"
            selectId="positions"
            inputId="positionsOptions"
            id="positionsSelect"
            label="Positions"
            onChange={handlePositions}
          />
          <MultipleSelect
            required
            value={personality}
            setValue={setPersonality}
            items={personalityItems}
            select="personality"
            selectId="personality"
            inputId="personalityOptions"
            id="personalitySelect"
            label="Personality"
            onChange={handlePersonality}
          />
          <MultipleSelect
            required
            value={schedule}
            setValue={setSchedule}
            items={scheduleItems}
            select="schedule"
            selectId="schedule"
            inputId="scheduleOptions"
            id="scheduleSelect"
            label="Schedule"
            onChange={handleSchedule}
          />
          <h2>Who do you want to queue with?</h2>
          <MultipleSelect
            required
            value={prefRank}
            setValue={setPrefRank}
            items={rankItems}
            select="prefRank"
            selectId="prefRank"
            inputId="prefRankOptions"
            id="prefRankSelect"
            label="Rank"
            onChange={handlePrefRank}
          />
          <MultipleSelect
            required
            value={prefPlaystyle}
            setValue={setPrefPlaystyle}
            items={playstyleItems}
            select="prefplaystyle"
            selectId="prefplaystyle"
            inputId="prefplaystyleOptions"
            id="prefplaystyleSelect"
            label="Playstyle"
            onChange={handlePrefPlaystyle}
          />
          <MultipleSelect
            required
            value={prefPositions}
            setValue={setPrefPositions}
            items={positionsItems}
            select="positions"
            selectId="positions"
            inputId="positionsOptions"
            id="positionsSelect"
            label="Positions"
            onChange={handlePrefPositions}
          />
          <MultipleSelect
            required
            value={prefPersonality}
            setValue={setPrefPersonality}
            items={personalityItems}
            select="personality"
            selectId="personality"
            inputId="personalityOptions"
            id="personalitySelect"
            label="Personality"
            onChange={handlePrefPersonality}
          />
          <MultipleSelect
            required
            value={prefSchedule}
            setValue={setPrefSchedule}
            items={scheduleItems}
            select="schedule"
            selectId="schedule"
            inputId="scheduleOptions"
            id="scheduleSelect"
            label="Schedule"
            onChange={handlePrefSchedule}
          />
          {currentUserInfo ? (
            <Submit
              type="submit"
              value="UPDATE"
              onClick={(e) => {
                handleUpdate(e);
              }}
            />
          ) : (
            <Submit
              type="submit"
              value="SAVE"
              onClick={(e) => {
                handleSave(e);
              }}
            />
          )}
        </Form>
        <ButtonWrapper>
          <LogoutButton />
          <Delete onClick={handleDelete}>Delete</Delete>
        </ButtonWrapper>
        <ButtonWrapper>
          <div></div>
        </ButtonWrapper>
      </SettingsWrapper>
    </>
  );
};

export default Settings;

const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  bottom: 56px;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.1);
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 450px;
`;
const Submit = styled.input`
  background-color: black;
  color: white;
  padding: 0.5em 1em;
  border-radius: 10px;
  border: none;
  margin: 1em;
  font-size: 20px;
`;
const Delete = styled.button`
  font-size: 20px;
  background-color: red;
  color: white;
  padding: 0.5em 1em;
  border-radius: 10px;
  border: none;
  margin: 1em;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 450px;
  div {
    height: 100px;
  }
`;

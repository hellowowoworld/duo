const { MongoClient, ObjectId } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);

// const STATIC_CHANNELS = [
//   { id: "summoner1", name: "global_notifications" },
//   { id: "summoner2", name: "global_chat" },
// ];

const cloudinary = require("cloudinary").v2;

const { v4: uuidv4 } = require("uuid");

let LeagueAPI = require("leagueapiwrapper");
const { RIOT_API } = process.env;
LeagueAPI = new LeagueAPI(RIOT_API, Region.NA);

const getAccountInfo = async (summoner) => {
  let summonerInfo = {};
  summonerInfo.mostPlayed = [];
  try {
    await LeagueAPI.initialize();
    const summonerAccountInfo = await LeagueAPI.getSummonerByName(summoner);
    summonerInfo.id = summonerAccountInfo.id;
    summonerInfo.accountId = summonerAccountInfo.accountId;
    summonerInfo.puuid = summonerAccountInfo.puuid;
    const data = await LeagueAPI.getChampionMastery(summonerAccountInfo);
    for (let i = 0; i <= 4; i++) {
      summonerInfo.mostPlayed.push({
        champion: data[i].championObject.name,
        championLevel: data[i].championLevel,
        title: data[i].championObject.title,
        blurb: data[i].championObject.blurb,
        tags: data[i].championObject.tags,
      });
    }
    return summonerInfo;
  } catch (err) {
    console.log(err);
  }
};
const createProfile = async (req, res) => {
  const summonerInfo = await getAccountInfo(req.params.summonerName);
  console.log(req.body);
  const {
    _id,
    summonerName,
    name,
    positions,
    rank,
    region,
    schedule,
    photos,
    playstyle,
    personality,
    bio,
    preferences,
  } = req.body;
  await client.connect();
  console.log("connected");
  const db = client.db("duoDb");
  const result2 = await db.collection("profiles").find().toArray();

  if (result2.length === 0) {
    const result = await db.collection("profiles").insertOne({
      _id: _id,
      summonerName: summonerName,
      name: name,
      positions: positions,
      rank: rank,
      region: region,
      schedule: schedule,
      photos: photos,
      playstyle: playstyle,
      personality: personality,
      bio: bio,
      preferences: preferences,
      summonerInfo: summonerInfo,
      potentialMatches: [],
      matches: [],
    });
    result
      ? res.status(200).json({
          status: 200,
          data: result,
          message: "profile creation successful",
        })
      : res.status(404).json({
          status: 404,
          data: req.body,
          message: "profile creation failed",
        });
  } else {
    try {
      for (let i = 0; i < result2.length; i++) {
        if (result2[i]._id === _id) {
          res.status(404).json({
            status: 404,
            data: req.body,
            message: "profile already exists",
          });
        } else if (result2[i].summonerName === summonerName) {
          res.status(404).json({
            status: 404,
            data: req.body,
            message: "summoner name already taken",
          });
        } else {
          const result = await db.collection("profiles").insertOne({
            _id: _id,
            summonerName: summonerName,
            name: name,
            positions: positions,
            rank: rank,
            region: region,
            schedule: schedule,
            photos: photos,
            playstyle: playstyle,
            personality: personality,
            bio: bio,
            preferences: preferences,
            summonerInfo: summonerInfo,
            potentialMatches: [],
            matches: [],
          });
          result
            ? res.status(200).json({
                status: 200,
                data: result,
                message: "profile creation successful",
              })
            : res.status(404).json({
                status: 404,
                data: req.body,
                message: "profile creation failed",
              });
        }
      }
      client.close();
      console.log("disconnected!");
    } catch (err) {
      console.log(err);
      client.close();
      console.log("disconnected!");
    }
  }
};
// const serverResponse = (req, res) => {
//   try {
//     res.json({
//       channels: STATIC_CHANNELS,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
const getProfile = async (req, res) => {
  const id = req.params.id;
  await client.connect();
  console.log("connected");
  const db = client.db("duoDb");
  const result = await db.collection("profiles").findOne({ _id: id });
  if (result) {
    res
      .status(200)
      .json({ status: 200, data: result, message: "retrieval successful" });
    client.close();
    console.log("disconnected!");
  } else {
    res
      .status(404)
      .json({ status: 404, data: req.body, message: "retrieval failed" });
    client.close();
    console.log("disconnected!");
  }
};

const getProfiles = async (req, res) => {
  await client.connect();
  console.log("connected");
  const db = client.db("duoDb");
  const result = await db.collection("profiles").find().toArray();
  if (result) {
    res
      .status(200)
      .json({ status: 200, data: result, message: "retrieval successful" });
    client.close();
    console.log("disconnected!");
  } else {
    res
      .status(404)
      .json({ status: 404, data: req.body, message: "retrieval failed" });
    client.close();
    console.log("disconnected!");
  }
};

const updateProfile = async (req, res) => {
  const summonerName = req.params.summonerName;
  const {
    _id,
    name,
    positions,
    rank,
    region,
    schedule,
    photos,
    playstyle,
    personality,
    bio,
    preferences,
  } = req.body;
  const query = { summonerName: summonerName };
  const newValues = {
    $set: {
      _id: _id,
      summonerName: summonerName,
      name: name,
      positions: positions,
      rank: rank,
      region: region,
      schedule: schedule,
      playstyle: playstyle,
      personality: personality,
      photos: photos,
      bio: bio,
      preferences: preferences,
    },
  };
  await client.connect();
  console.log("connected");
  const db = client.db("duoDb");
  try {
    const result2 = await db
      .collection("profiles")
      .findOne({ summonerName: summonerName });
    if (result2._id === _id) {
      const result = await db
        .collection("profiles")
        .updateOne(query, newValues);
      result
        ? res
            .status(200)
            .json({ status: 200, data: result, message: "update successful" })
        : res
            .status(404)
            .json({ status: 404, data: req.body, message: "update failed" });
    } else {
      res
        .status(404)
        .json({ status: 404, data: req.body, message: "id did not match" });
    }
    client.close();
    console.log("disconnected!");
  } catch (err) {
    console.log(err);
    client.close();
    console.log("disconnected!");
  }
};
const updateChat = async (req, res) => {
  console.log(req.body);
  const { user1, user2, message } = req.body;
  const chatmessage = { message: message, author: user1, recipient: user2 };

  await client.connect();
  console.log("connected");
  const db = client.db("duoDb");
  const result1 = await db
    .collection("chats")
    .updateOne(
      { user1: user1, user2: user2 },
      { $push: { messages: chatmessage } }
    );
  const result2 = await db
    .collection("chats")
    .updateOne(
      { user1: user2, user2: user1 },
      { $push: { messages: chatmessage } }
    );
  if (result1 && result2) {
    res.status(200).json({
      status: 200,
      data: { result1: result1, result2: result2 },
      message: "update successful",
    });
    client.close();
    console.log("disconnected!");
  } else {
    res
      .status(404)
      .json({ status: 404, data: req.body, message: "update failed" });
    client.close();
    console.log("disconnected!");
  }
};

const getChat = async (req, res) => {
  console.log(req.params);
  const { user1, user2 } = req.params;
  await client.connect();
  const db = client.db("duoDb");
  const result = await db
    .collection("chats")
    .find({ $and: [{ user1: user1 }, { user2: user2 }] })
    .toArray();
  if (result) {
    res
      .status(200)
      .json({ status: 200, data: result, message: "retrieval successful" });
    client.close();
    console.log("disconnected!");
  } else {
    res
      .status(404)
      .json({ status: 404, data: req.body, message: "retrieval failed" });
    client.close();
    console.log("disconnected!");
  }
};

const addPotentialMatches = async (req, res) => {
  const summonerName = req.params.summonerName;
  const profile = req.body.info;
  const query = { summonerName: summonerName };
  const newValues = {
    $push: { potentialMatches: profile },
  };
  await client.connect();
  console.log("connected");
  const db = client.db("duoDb");
  const result = await db.collection("profiles").updateOne(query, newValues);
  if (result) {
    const result2 = await db
      .collection("profiles")
      .findOne({ summonerName: summonerName });
    const result3 = await db
      .collection("profiles")
      .findOne({ summonerName: profile.summonerName });
    if (
      result2.potentialMatches.some((element) => element._id === result3._id) &&
      result3.potentialMatches.some((element) => element._id === result2._id)
    ) {
      const result4 = await db.collection("profiles").updateOne(
        { _id: result2._id },
        {
          $push: { matches: result3 },
        }
      );
      const result5 = await db.collection("profiles").updateOne(
        { _id: result3._id },
        {
          $push: { matches: result2 },
        }
      );
      const user1chat = {
        _id: uuidv4(),
        user1: profile.summonerName,
        user2: summonerName,
        messages: [],
      };
      const user2chat = {
        _id: uuidv4(),
        user2: profile.summonerName,
        user1: summonerName,
        messages: [],
      };
      const result6 = await db
        .collection("chats")
        .insertMany([user1chat, user2chat]);
      res
        .status(200)
        .json({ status: 200, data: result, message: "potential match added" });
    }
    client.close();
    console.log("disconnected!");
  } else {
    res.status(404).json({
      status: 404,
      data: req.body,
      message: "potential match not added",
    });
    client.close();
    console.log("disconnected!");
  }
};

const deleteProfile = async (req, res) => {
  const summonerName = req.params.summonerName;
  await client.connect();
  console.log("connected");
  const db = client.db("duoDb");
  const result = await db
    .collection("profiles")
    .deleteOne({ summonerName: summonerName });

  if (result) {
    const result2 = await db
      .collection("profiles")
      .updateMany(
        { matches: { $elemMatch: { summonerName: summonerName } } },
        { $pull: { matches: { summonerName: summonerName } } }
      );
    const result3 = await db
      .collection("profiles")
      .updateMany(
        { potentialMatches: { $elemMatch: { summonerName: summonerName } } },
        { $pull: { potentialMatches: { summonerName: summonerName } } }
      );
    res
      .status(202)
      .json({ status: 202, data: result, message: "deletion successful" });
    client.close();
    console.log("disconnected!");
  } else {
    res
      .status(404)
      .json({ status: 404, data: req.body, message: "deletion failed" });
    client.close();
    console.log("disconnected!");
  }
};

module.exports = {
  createProfile,
  getProfile,
  getProfiles,
  updateProfile,
  addPotentialMatches,
  deleteProfile,
  updateChat,
  getChat,
};

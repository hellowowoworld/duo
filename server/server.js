const express = require("express");
const app = express();

const morgan = require("morgan");
// const cors = require("cors");

// const options = {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// };
app.use(morgan("tiny")).use(express.json()).use(express.static("public"));
//   .use(
//     cors({
//       origin: "*",
//       methods: ["GET", "POST"],
//     })
//   );
// const httpServer = require("http").createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(httpServer);

const dotenv = require("dotenv");
dotenv.config();

const {
  createProfile,
  getProfile,
  getProfiles,
  updateProfile,
  addPotentialMatches,
  deleteProfile,
  updateChat,
  getChat,
} = require("./handlers");

// io.on("connection", (socket) => {
//   console.log("new client connected");
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

app.get("/", () => {
  console.log("Hello wowowoworld XD");
});
app.get("/api/profile/:id", getProfile);
app.get("/api/profiles", getProfiles);
app.get("/api/chat/:user1/:user2", getChat);
app.post("/api/profile/:summonerName/create", createProfile);
app.patch("/api/profile/:summonerName/update", updateProfile);
app.patch("/api/profile/:summonerName/add", addPotentialMatches);
app.patch("/api/profile/:summonerName/updateChat", updateChat);
app.delete("/api/profile/:summonerName/delete", deleteProfile);
// app.get("/getChannels", serverResponse);
app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
});
app.listen(8000);

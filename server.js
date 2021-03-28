const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Local Time';

// Run when client connects
//console.log("server.js connecting... io,  socketio,  username, room", io,  socketio);
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    //console.log("server.js connected ,  username, room, socket.id, user", username, room, socket.id, user);

    socket.join(user.room);


    // Welcome current user
    socket.emit('message', formatMessage(botName, 'You have now entered Pangea!'));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

const cors = require("cors");
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose")
const passport = require("./config/passport");
const ApiRoutes = require("./routes/apiRoutes.js");

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/userdb2", { useNewUrlParser: true });

app.use(
  cors({
    origin: "*",
    credentials: true
  }
  )
)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(ApiRoutes);

app.use(express.static("public"));

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  //res.sendFile(path.join(__dirname, "./client/build/index.html"));
  //res.sendFile(path.join(__dirname, "./client/src/pages/index.html"));
  res.sendFile(path.join(__dirname, "./client/src/pages/Members.js"));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

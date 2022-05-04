const WebSocket = require("ws");
const express = require("express");
const { application } = require("express");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static("public"));
// const wss = new WebSocketServer({ port: 8080 });

// wss.on("connection", function connection(ws) {
//   ws.on("message", function message(data) {
//     console.log("received: %s", data);
//   });

//   ws.send("somethingjkl");
// });

var server = app.listen(port, () => {
  console.log(`listening at localhost:${port}`);
});
// web socket code
//const wss = new WebSocket.Server({ port: 8080 });

var player1 = null;
var player2 = null;

const wss = new WebSocket.Server({ server: server });

wss.on("connection", function connection(ws) {
  if (player1 == null) {
    player1 = ws;
    console.log("player 1 assigned")
  } else if (player2 == null) {
    player2 = ws;
    console.log("player 2 assigned")
  } else {
    console.log("all players are taken")
  }
  ws.on("message", function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});

wss.on("connection", function (client) {
  // sendBoard(client);
  console.log("tests");

  client.on("message", function (message) {
    console.log("message");
    var data = JSON.parse(message);

    if (data.action) {
      if (data.action == "play") {
        console.log("play");
        if (data.position !== undefined && play(data.position)) {
          // sendBoardToAll();
          console.log("this worked");
        } else {
          console.log("this didnt work")
        }
      }
    }
  });
});

// function sendBoardToAll(message) {
//   var data = JSON.stringify(message);
//   wss.clients.forEach(function each(client) {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(data);
//     }
//   });
// }

// connect to ws.localhost:8080 to get this to run

// // app.post('/gifts', (req, res) => {
//   pet = new pet
//   pet.save().then {
//     broadCastToAll(
// action: "newPet",
// pet: pet
//     )
//   }
// })

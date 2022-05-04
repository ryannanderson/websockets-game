// console.log("hi");
// // wsecho.herokuapp.com
// var socket = new WebSocket("ws://wsecho.herokuapp.com");

// var button = document.querySelector("button");
// button.onclick = function () {
//   socket.send("this worked");
// };

// socket.onmessage = function (event) {
//   var newDiv = document.createElement("div");
//   newDiv.innerHTML = event.data;
//   document.body.appendChild(newDiv);
// };

// connect, send, receive

// end

// server: connect4ws.herokuapp.com

var app = new Vue({
  el: "#game",
  data: {
    playerOneBoard: false,
    playerTwoBoard: false,
    playerSelection: true,
    scoreBoard: false,
    socket: null,
    pleaseSelectPlayers: false,
    onlyPlayerOne: false,
    onlyPlayerTwo: false,
    pOneScore: 0,
    pTwoScore: 0,
    win: false,
    winTwo: false,
    playerOneScoreCard: true,
    playerTwoScoreCard: true,
    winnerDeclared: false,
    boxes: [
      {x: 50, y: 100, size: 200, color: "#000"},
      {x: 10, y: 10, size: 10, color: "#000"},
      {x: 400, y: 200, size: 100, color: "#3e5c82"},
      {x: 200, y: 50, size: 50, color: "#000"},
      {x: 300, y: 20, size: 30, color: "#555"},
      {x: 170, y: 300, size: 90, color: "#578a6e"},
      {x: 180, y: 180, size: 180, color: "#3e5c82"},
      {x: 120, y: 260, size: 40, color: "#3e5c82"},
      {x: 350, y: 350, size: 90, color: "#3e5c82"},
      {x: 420, y: 370, size: 120, color: "#578a6e"},
    ],
    box: {},
    boxesTwo: [
      {x: 50, y: 100, size: 200, color: "#000"},
      {x: 10, y: 10, size: 10, color: "#000"},
      {x: 400, y: 200, size: 100, color: "#3e5c82"},
      {x: 200, y: 50, size: 50, color: "#000"},
      {x: 300, y: 20, size: 30, color: "#555"},
      {x: 170, y: 300, size: 90, color: "#578a6e"},
      {x: 180, y: 180, size: 180, color: "#3e5c82"},
      {x: 120, y: 260, size: 40, color: "#3e5c82"},
      {x: 350, y: 350, size: 90, color: "#3e5c82"},
      {x: 420, y: 370, size: 120, color: "#578a6e"},
    ],
    boxTwo: {},
    reloadBoxes: [
    {x: 50, y: 100, size: 200, color: "#000"},
    {x: 10, y: 10, size: 10, color: "#000"},
    {x: 400, y: 200, size: 100, color: "#3e5c82"},
    {x: 200, y: 50, size: 50, color: "#000"},
    {x: 300, y: 20, size: 30, color: "#555"},
    {x: 170, y: 300, size: 90, color: "#578a6e"},
    {x: 180, y: 180, size: 180, color: "#3e5c82"},
    {x: 120, y: 260, size: 40, color: "#3e5c82"},
    {x: 350, y: 350, size: 90, color: "#3e5c82"},
    {x: 420, y: 370, size: 120, color: "#578a6e"},
  ],
    firstPlayer: "",
    secondPlayer: "",
    choosePlayer1: true,
    choosePlayer2: true,
    player1Disabled: false,
    player2Disabled: false
    
  },
  methods: {
    connectSocket: function () {
      console.log("function called");
      this.socket = new WebSocket("wss://websockets-square-game.herokuapp.com/");
      this.socket.onmessage = (event) => {
        console.log(event.data);
        var message = JSON.parse(event.data);
        if (message.action == "play") {
          this.boxes = message.boxes;
          this.boxesTwo = message.boxesTwo;
        } else if (message.action == "invalid") {
          console.log("no");
        } else if (message.action == "start") {
          this.playerOneBoard = true;
          this.playerTwoBoard = true;
          this.playerSelection = false;
          this.scoreBoard = true;
        }
        //console.log(event);
      };
    },
    playerOne: function (position) {
      // console.log("circle");
      // var message = { action: "play" };
      // this.socket.send(JSON.stringify(message));
      if (this.firstPlayer == "Player One"){
        this.pOneScore += 1;
      }
      if (this.boxes == 0) {
        this.win = true;
        this.playerOneScoreCard = false;
        this.playerTwoScoreCard = false;
        this.playerOneBoard = false;
        this.playerTwoBoard = false;
        // this.winnerDeclared = true;
      }
    },
    removeBox: function (index) {
      //if (this.firstPlayer == "Player One"){
        this.boxes.splice(index, 1);
        var message = { action: "play", boxes: this.boxes, boxesTwo: this.boxesTwo };
        this.socket.send(JSON.stringify(message));
      // } else {
      //   console.log("nope");
      //   this.onlyPlayerOne = true;
      // }
      
    },
    removeBoxTwo: function (index) {
      //if (this.secondPlayer =="Player Two"){
        this.boxesTwo.splice(index, 1);
        var message = { action: "play" , boxes: this.boxes, boxesTwo: this.boxesTwo  };
      this.socket.send(JSON.stringify(message));
      // } else {
      //   console.log("this didnt work");
      //   this.onlyPlayerTwo = true;
      // }
    },
    playerTwo: function (position) {
      // console.log("circle 2");
      // var message = { action: "play"};
      // this.socket.send(JSON.stringify(message));
      console.log(this.secondPlayer)
      if (this.secondPlayer == "Player Two"){
        this.pTwoScore += 1;
      } else {
        console.log("you cant do that!")
      }
      if (this.boxesTwo == 0) {
        this.winTwo = true;
        this.playerTwoScoreCard = false;
        this.playerOneBoard = false;
        this.playerTwoBoard = false;
        this.playerOneScoreCard = false;
      }
    },
    startGame: function () {
      //if(this.firstPlayer == "Player One" && this.secondPlayer == "Player Two"){
        var message = { action: "start"};
        this.socket.send(JSON.stringify(message))
        //this.boxes = this.reloadBoxes;
        this.playerOneBoard = true;
        this.playerTwoBoard = true;
        this.playerSelection = false;
        this.scoreBoard = true;
      // } else {
      //   console.log("please select players");
      //   this.pleaseSelectPlayers = true;
      // }
    },
    playerOneButton: function () {
      this.firstPlayer = "Player One";
      
      console.log("player one has been assigned.")
      this.choosePlayer1 = false;
      this.player1Disabled = true;
    },
    playerTwoButton: function () {
      this.secondPlayer = "Player Two";
      console.log("player two has been assigned.")
      this.choosePlayer2 = false;
      this.player2Disabled = true;
    },
    playAgain: function () {
      this.win = false;
      this.playerSelection = true;
      this.choosePlayer1 = true;
      this.choosePlayer2 = true;
      this.player1Disabled = false;
      this.player2Disabled = false;
      this.boxes = this.reloadBoxes;
    }
  },
  created: function () {
    console.log("ready");
    this.connectSocket();
  },
});

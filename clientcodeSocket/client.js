const io = require("socket.io-client");

const socket = io.connect("http://localhost:8083/socket", {
  path: "/socket.io/socket",
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("connected to server");

  
  socket.emit("setId", "user123");
});

socket.on("user123", (data) => {
  console.log("received event:", data);
  if(data==="notify"){
    //a notification added to the user , send a new request to update the notification
  }
  else{
    //a new message arrived for the user , send a new request to update chat 
  }
});

socket.on("disconnect", () => {
  console.log("disconnected from server");
});

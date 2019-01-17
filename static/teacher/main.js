let pinEl = document.getElementById("class-pin");
let classPin;
const socket = io();

socket.emit("teacher");

socket.on("sendCode", data => {
  classPin = data;
  pinEl.innerHTML = "Class PIN: " + classPin;
});

socket.on("question", data => {
  $(".jumbotron").after("<div class=\"container-fluid\"><h2 class=\"text-center\">" + data + "</h2></div>");
});

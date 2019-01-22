let pinEl = document.getElementById("class-pin");
let classPin;
const socket = io();

socket.emit("teacher");

socket.on("sendCode", data => {
  classPin = data;
  $("#class-pin").html("Class PIN: " + classPin);
});

socket.on("question", data => {
  if (data.pin == classPin) {
    $("footer").before("<p class=\"message\">" + data.question + "</p>");
    $(".container-fluid").click((e) => {
      e.target.remove();
    });
  }
});

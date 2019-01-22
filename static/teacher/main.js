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
    $("footer").before("<div class=\"container-fluid\"><h2 class=\"text-center\">" + data.question + "</h2></div>");
    $(".container-fluid").click((e) => {
      e.target.remove();
    });
  }
});

let classPin;
const socket = io();

socket.emit("teacher");

socket.on("sendCode", data => {
  classPin = data;
  $("#pinbar").html(classPin);
});

socket.on("question", data => {
  if (data.pin == classPin) {
    $("#messagebox").append("<p class=\"message\">" + data.question + "</p>");
    $(".message").click((e) => {
      e.target.remove();
    });
  }
});

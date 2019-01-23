let classPin;
const socket = io();

socket.emit("teacher");

socket.on("sendCode", data => {
  classPin = data;
  $("#pinbar").html(classPin);
});

socket.on("question", data => {
  if (data.pin == classPin) {
    $("#messagebox").append("<p id=\"" + data.id + "\" class=\"message\">" + data.question + "</p>");
    $(".message").click((e) => {
      socket.emit("remove", e.target.id);
      e.target.remove();
    });
  }
});

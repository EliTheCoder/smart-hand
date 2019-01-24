let delayed = false;
const socket = io();

$("#sendbutton").click(() => {
  fullsendfortheboys();
});

$("#messagebar").keypress(e => {
  if (e.which == 13) fullsendfortheboys();
});

socket.on("question", data => {
  if (data.pin == $("#pininput").val()) {
    $("#messagebox").append("<p id=\"" + data.id + "\">" + data.question + "</p>");
  }
});

socket.on("remove", data => {
  $("#" + data).remove();
});

function fullsendfortheboys() {
  if (!delayed && $("question").val().substr(-1) != "?")) {
    delayed = true;
    socket.emit("question", {
      question: $("#messagebar").val(),
      pin: $("#pininput").val()
    });
    $("#messagebar").val("");
    setTimeout(() => {
      delayed = false;
    }, 10000);
  }
}

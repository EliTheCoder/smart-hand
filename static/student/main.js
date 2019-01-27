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

socket.on("ban", data => {
  window.localStorage.banned = data;
   $("#messagebar").css("visibility", "hidden");
});

function fullsendfortheboys() {
  if (!delayed && window.localStorage.banned != $("#pininput").val()) {
    delayed = true;
    socket.emit("question", {
      question: $("#messagebar").val(),
      pin: $("#pininput").val()
    });
    $("#messagebar").val("");
    $("#messagebar").css("visibility", "hidden");
    setTimeout(() => {
      delayed = false;
      $("#messagebar").css("visibility", "visible");
    }, 10000);
  }
}

let questionEl = document.getElementById("messagebar");
let delayed = false;
const socket = io();

$("#sendbutton").click(() => {
  fullsendfortheboys();
});

$("#messagebar").keypress(e => {
  if (e.keyCode == 69) fullsendfortheboys();
});

function fullsendfortheboys() {
  if (!delayed) {
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

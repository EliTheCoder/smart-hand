let delayed = false;
const socket = io();

$("#sendbutton").click(() => {
  fullsendfortheboys();
});

$("#messagebar").keypress(e => {
  if (e.which == 13) fullsendfortheboys();
});

function fullsendfortheboys() {
  if (!delayed) {
    delayed = true;
    socket.emit("question", {
      question: $("#messagebar").val(),
      pin: $("#pininput").val()
    });
    $("#messagebox").append("<br />"+$("#messagebar").val());
    $("#messagebar").val("");
    setTimeout(() => {
      delayed = false;
    }, 10000);
  }
}

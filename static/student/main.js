let questionEl = document.getElementById("messagebar");
let delayed = false;
const socket = io();

function send() {
  if (!delayed) {
    delayed = true;
    socket.emit("question", {
      question: $("#messagebar").val(),
      pin: $("#pininput").val()
    });
    $("#messagebar").val("");
    setTimeout(() => {
      delayed = false;
    },10000);
  }
}

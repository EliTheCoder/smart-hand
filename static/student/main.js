let pinEl = document.getElementById("class-pin");
let questionEl = document.getElementById("question");
const socket = io();

function send() {
  socket.emit("question", {
    question: questionEl.value,
    pin: pinEl.value
  });
  questionEl.value = "";
}

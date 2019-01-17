let pinEl = document.getElementById("class-pin");
let questionEl = document.getElementById("question");
const socket = io();

function send() {
  socket.emit("connectroom", pinEl.value);
  setTimeout(() => {
    socket.emit("question", {question: questionEl.value, pin: pinEl.value});
  }, 5000);
}

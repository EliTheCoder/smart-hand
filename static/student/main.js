let pinEl = document.getElementById("class-pin");
let questionEl = document.getElementById("question");
let delayed = false;
const socket = io();

function send() {
  if (!delayed) {
    delayed = true;
    socket.emit("question", {
      question: questionEl.value,
      pin: pinEl.value
    });
    setTimeout(()=>{
      delayed = false;
    },10000);
  }
}

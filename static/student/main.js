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
    $("#messagebox").append("<p>" + data.question + "</p>");
  }
});

function fullsendfortheboys() {
  if (!delayed) {
    $("#cooldownbar").width("100%");
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

setInterval(()=>{
  if ($("#cooldownbar").width() > 0 && delayed) {
    console.log(Math.round($("#cooldownbar").width()/1440))
    $("#cooldownbar").width(Math.round($("#cooldownbar").width()/1440) - 1 + "%");
  }
}, 100);

try {
  var GameSession = require('./app/GameSession.js');
}
catch(err) {
  console.log(err)
}

var b = document.getElementById("myCanvas");
var context = b.getContext("2d");
var gamesession = new GameSession();
document.getElementById("body").onload = function() {gamesession.init()};

$('#myCanvas').on('mousedown', function(e){
    if (isDown === false) {

        isDown = true;

        var pos = getMousePos(canvas, e);
        x1 = pos.x;
        y1 = pos.y;
    }
});

// when mouse button is released (note: window, not canvas here)
$(window).on('mouseup', function(e){
    if (isDown === true) {

        var pos = getMousePos(canvas, e);
        x2 = pos.x;
        y3 = pos.y;

        isDown = false;

        //we got two sets of coords, process them
        alert(x1 + ',' + y1 + ',' +x2 + ',' +y2);
    }
});

// get mouse pos relative to canvas (yours is fine, this is just different)
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
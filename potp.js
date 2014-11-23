// Game implementation
 window.onload = addListeners;
    var part1 = document.getElementById("part1");
    var rect = part1.getBoundingClientRect();

    var target = document.getElementById("target");
    var rect = target.getBoundingClientRect();


    // Setting starting values for the part1
    var part1 = {value : 10, 
                width : document.getElementById("part1").clientWidth,
                height :  document.getElementById("part1").clientHeight,
                xpos : rect.left,
                ypos : rect.top
                };

    document.getElementById("part1").innerHTML = part1.value

    // Setting starting values for the target
    var target = {targetValue : 100, 
                  currentValue : 0,
                  width : 300,
                  height : 300, 
                  xpos : 100,
                  ypos : 100 };

    document.getElementById("target").innerHTML = "targetValue: " + target.targetValue + "<br />" +
                                                "currentValue: " + target.currentValue;



    // Listeners for mouse Actions
    function addListeners(){
        document.getElementById('part1').addEventListener('mousedown', mouseDown, false);
        window.addEventListener('mouseup', mouseUp, false);

    }

    function mouseUp()
    {
        window.removeEventListener('mousemove', divMove, true);

        // Conditions to add value
        if (parseInt(part1.xpos) >= parseInt(target.xpos) 
          &&  parseInt(part1.xpos) <= parseInt(target.xpos) + parseInt(target.width) 
          &&  parseInt(part1.ypos) >= parseInt(target.ypos)
          &&  parseInt(part1.ypos) <= parseInt(target.ypos) + parseInt(target.height) 
          ) {

          target.currentValue = target.currentValue + part1.value;
          document.getElementById("target").innerHTML = "targetValue: " + target.targetValue + "<br />"+ "currentValue: " + target.currentValue;         
        };
    
    }
    
    function mouseDown(e){      
      var div = document.getElementById('part1');
      
      window.addEventListener('mousemove', divMove, true);
      };
      
    function divMove(e){
      var div = document.getElementById('part1');

      div.style.position = 'absolute';
      div.style.left = e.clientX - (div.clientWidth / 2 ) + "px";
      div.style.top = e.clientY - (div.clientHeight / 2 ) + "px";
      part1.xpos = div.style.left
      part1.ypos = div.style.top
      }
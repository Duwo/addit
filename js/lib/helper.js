var helper = {
  getRandomColor: function() {
    letters = '0123456789ABCDEF'.split('');
    color = '#';
    for (i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },

// Cicle hit
  hitTest: function(circle, mx, my) {
    dx = mx - circle.posx;
    dy = my - circle.posy;
    //a "hit" will be registered if the distance away 
    // from the center is less than the radius of the circular object        
    return (dx*dx + dy*dy < circle.radius*circle.radius);
  },

  contains: function(arr, obj) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
  },

  addValue: function(sumParts) {
    partValue = Math.floor((Math.random() * 10) + 1)
    sign = Math.round(Math.random() * 2)
    if (sign === 0) {
      sumParts += partValue
    } else if (sign === 1){
      sumParts -= partValue
    } else if (sign === 2) {
      sumParts *= partValue
    }
    return partValue, sumParts
  },
  convertMouse: function(evt, canvas) {
    if (evt.pageX || evt.pageY) { 
      x = evt.offsetX;
      y = evt.offsetY;
    }
    else { 
      x = evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
      y = evt.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
    }
    console.log('PageX: '+evt.pageX)
    console.log('PageX: '+evt.pageX)
    //x -= canvas.offsetLeft;
    //y -= canvas.offsetTop;
    return [x, y]
  }
};

try {
  module.exports = helper
}
catch(err) {
  console.log(err)
}
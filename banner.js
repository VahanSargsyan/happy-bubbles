(function(){
  'use strict';
 window.Banner = function Banner(keyword, distance, k, colors, fontSize, font){
    var canvas;
    var context;

    var bgCanvas;
    var bgContext;
    font = font || 'Arial';
    distance = distance || 3;
    fontSize = fontSize || 100;
    k = k || 1;
    colors = colors || ['rgb(75,187,209)', 'rgb(2,164,106)', 'rgb(237,114,37)', 'rgb(61,48,145)'];

    //Each particle/icon
    var parts = [];

    var mouse = {x:-1,y:-1};
    var mouseOnScreen = false;




    //When creating the particles, we assign a color from this list.
    color: colors[Math.floor(Math.random() * colors.length)],

      this.initialize = function(canvas_id, width, height){
        canvas = document.getElementById(canvas_id);
        context = canvas.getContext('2d');

        canvas.width = width || window.innerWidth;
        canvas.height = height || window.innerHeight;

        bgCanvas = document.createElement('canvas');
        bgContext = bgCanvas.getContext('2d');

        bgCanvas.width = width || window.innerWidth;
        bgCanvas.height = height || window.innerHeight;

        canvas.addEventListener('mousemove', MouseMove, false);
        canvas.addEventListener('mouseout', MouseOut, false);

        test();
      };

    var test = function(){

      bgContext.fillStyle = "#123321";
      bgContext.font = fontSize + 'px ' + font;
      bgContext.fillText(keyword, 20, 100);

      clear();
      getCoords();
    };

    var getCoords = function(){
      var imageData, pixel, height, width;

      imageData = bgContext.getImageData(0, 0, canvas.width, canvas.height);

      // quickly iterate over all pixels - leaving density gaps
      for(height = 0; height < bgCanvas.height; height += distance){
        for(width = 0; width < bgCanvas.width; width += distance){
          pixel = imageData.data[((width + (height * bgCanvas.width)) * 4) - 1];
          //Pixel is black from being drawn on.
          if(pixel === 255) {
            drawCircle(width, height);
          }
        }
      }

      setInterval( update, 40 );
    };

    var drawCircle = function(x, y){
      parts.push(
        {c: colors[Math.floor(Math.random() * colors.length)],
          x: x, //Original position
          y: y,
          x2: x, //Movable position
          y2: y,
          v:{x:(Math.random() * 3) * 2 - 3 , y:(Math.random() * 3) * 2 - 3},
        }
      )
    };

    var update = function(){
      var i, dx, dy, sqrDist, scale;

      clear();
      for (i = 0; i < parts.length; i++){

        if (mouseOnScreen === true){

          parts[i].x2 += parts[i].v.x;
          parts[i].y2 += parts[i].v.y;

          if (parts[i].x2 > canvas.width || parts[i].x2 < 0) {
            parts[i].v.x = -parts[i].v.x;
          }

          if (parts[i].y2 > canvas.height || parts[i].y2 < 0) {
            parts[i].v.y = -parts[i].v.y;
          }
        } else {
          parts[i].x2 += (parts[i].x - parts[i].x2) / 8;
          parts[i].y2 += (parts[i].y - parts[i].y2) / 8;
        }


        //Find distance from mouse/draw!
        dx = parts[i].x2 - mouse.x;
        dy = parts[i].y2 - mouse.y;
        sqrDist =  Math.sqrt(dx*dx + dy*dy);
        scale = Math.max( Math.min( 6 - ( sqrDist / 12 ), 10 ), 1 );
        //Draw the circle

        context.fillStyle = parts[i].c;
        context.beginPath();
        //Scale is a size of part
        context.arc(parts[i].x2, parts[i].y2, k * scale ,0 , Math.PI*2, true);
        context.closePath();
        context.fill();

      }
    };

    var MouseMove = function(e) {
      if (e.layerX || e.layerX === 0) {
        //Reset particle positions
        mouseOnScreen = true;


        mouse.x = e.layerX - canvas.offsetLeft;
        mouse.y = e.layerY - canvas.offsetTop;
      }
    };

    var MouseOut = function(e) {
      mouseOnScreen = false;
      mouse.x = -200;
      mouse.y = -200;

    };

    //Clear the on screen canvas
    var clear = function(){
      context.fillStyle = '#eee';
      context.beginPath();
      context.rect(0, 0, canvas.width, canvas.height);
      context.closePath();
      context.fill();8                             }
  };
})() 


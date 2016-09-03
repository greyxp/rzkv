
var colors = new Array(
  [62,35,255],
  [60,255,60],
  [255,35,98],
  [45,175,230],
  [255,0,255],
  [255,128,0]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient()
{
  
  if ( $===undefined ) return;
  
var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

 $(document.body).css({
   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
  
  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];
    
    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    
  }
}

setInterval(updateGradient,10);

//GLITCH

var canvas = document.getElementById('canvas')
  , context = canvas.getContext('2d')
  , img = new Image()
  , w
  , h
  , offset
  , glitchInterval;

img.src = 'http://blog.codepen.io/wp-content/uploads/2012/06/White-Large.png';
img.onload = function() {
  init();
  window.onresize = init;
};

var init = function() {
  clearInterval(glitchInterval);
  canvas.width = w = window.innerWidth;
  offset = w * .1;
  canvas.height = h = ~~(175 * ((w - (offset * 2)) / img.width));
  glitchInterval = setInterval(function() {
    clear();
    context.drawImage(img, 0, 110, img.width, 175, offset, 0, w - (offset * 2), h);
    setTimeout(glitchImg, randInt(250, 1000));
  }, 500);
};

var clear = function() {
  context.rect(0, 0, w, h);
  context.fill();
};
    
var glitchImg = function() {
  for (var i = 0; i < randInt(1, 13); i++) {
    var x = Math.random() * w;
    var y = Math.random() * h;
    var spliceWidth = w - x;
    var spliceHeight = randInt(5, h / 3);
    context.drawImage(canvas, 0, y, spliceWidth, spliceHeight, x, y, spliceWidth, spliceHeight);
    context.drawImage(canvas, spliceWidth, y, x, spliceHeight, 0, y, x, spliceHeight);
  }
};

var randInt = function(a, b) {
  return ~~(Math.random() * (b - a) + a);
};
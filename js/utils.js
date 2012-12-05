// *******************
// Util functions


// A function to calcuate lighter hex colour for the wireframe 
// courtesy of Craig Buckler:
// http://www.sitepoint.com/javascript-generate-lighter-darker-color/

function colorLuminance(hex, lum) {  
    // validate hex string  
    hex = String(hex).replace(/[^0-9a-f]/gi, '');  
    if (hex.length < 6) {  
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];  
    }
    lum = lum || 0;  
    // convert to decimal and change luminosity  
    var rgb = "", c, i;  
    for (i = 0; i < 3; i++) {  
        c = parseInt(hex.substr(i*2,2), 16);  
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);  
        rgb += ("00"+c).substr(c.length);  
    }
    return rgb;  
};


// Function to get the max value in a 2-dimensional array
function getMaxArr(arr){
  var maxVal = arr[0][0];
  for( var i=0; i<arr.length; i++ ){
    for ( var j=0; j<arr[i].length; j++ ){
      if( arr[i][j] > maxVal) maxVal = arr[i][j];
    }
  }
  return maxVal;
}

// Function to get the max value in a 2-dimensional array
function getMinArr(arr){
  var minVal = arr[0][0];
  for( var i=0; i<arr.length; i++ ){
    for ( var j=0; j<arr[i].length; j++ ){
      if( arr[i][j] < minVal) minVal = arr[i][j];
    }
  }
  return minVal;
}

// Gets the closest rounding of the max value
function getRoundMax (val){
  
  var powsign = -1;
  if( val < 1 && val > -1){
    var roundRatio = 1;
  }else{
    var maxLength = val.toString().length;
    var roundRatio = Math.pow( 10, powsign*(maxLength-1) );
  }
  
  if( val > 0){
    return Math.ceil(val*roundRatio)/roundRatio;
  }else{
    return Math.round(val*roundRatio)/roundRatio;
  }
  
}

// function to get total count in two dimentional array
function getTotalArr(arr){
  var total = 0;
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      if ( typeof arr[i][j] != 'number' ) arr[i][j] = 0;
      total += arr[i][j];
    }
  }
  return total;
}

// funciton to update the legend div - requires jQuery
function initLegend(el, schema){
  el.empty();
  for ( var i=0; i<schema.cols.length; i++){
    el.append('<div style="margin-right:5px; background-color:#'+
                schema.cols[i].color+'" class="div-legend-color left"></div>'+
               '<div class="left" style="margin-right:10px;">'+
                schema.cols[i].name+'</div>');
  }
  el.append ('<div class="clear"></div>');
}

// function to return canvas scale texts
function createTextureScale ( text, h, line, size, color, backGroundColor, align ) {

  var backgroundMargin = 10;
  
  var canvas = document.createElement("canvas");

  var context = canvas.getContext("2d");
  context.font = size + "px Arial";

  var textMaxWidth = context.measureText(text[0].name).width;
  for ( var i=1; i<text.length; i++ ){
    var textWidth = context.measureText(text[i]).width;
    if ( textWidth>textMaxWidth ) textMaxWidth = textWidth;
  }

  canvas.width = textMaxWidth + backgroundMargin;
  canvas.height = h + backgroundMargin;
  context = canvas.getContext("2d");
  
  context.font = size + "px Arial";

  if(backGroundColor) {
    context.beginPath();
    context.rect(0, 0, canvas.width , canvas.height);
    context.fillStyle = backGroundColor;
    context.fill();
  }

  context.textAlign = align;
  context.textBaseline = "middle";
  
  var xpos = backgroundMargin;
  if( align == "right") xpos = textMaxWidth-backgroundMargin;
  
  for ( var i=0; i<text.length; i++ ){
    context.fillStyle = color;
    if ( text[i].color )  context.fillStyle = "#"+text[i].color;
    context.fillText(text[i].name, xpos, i*line+line/2);
  }
  
  return canvas;
  
}

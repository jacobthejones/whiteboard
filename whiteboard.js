// Set up the canvas element where the user can draw on the whiteboard
var canvas = document.getElementById("canvas");

// Set up the 2D drawing context for the canvas
var ctx = canvas.getContext("2d");

// Set up some default styles for the drawing context
ctx.lineWidth = 3;
ctx.strokeStyle = "#000";

// Set up some variables to keep track of the user's drawing
var isDrawing = false;
var lastX = 0;
var lastY = 0;

// Set up an event listener that allows the user to draw on the canvas
canvas.addEventListener("mousedown", function(e) {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvas.addEventListener("mousemove", function(e) {
  if (isDrawing) {
    // Draw a line from the last known position to the current position
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    // Update the last known position for the next line segment
    lastX = e.offsetX;
    lastY = e.offsetY;
  }
});

canvas.addEventListener("mouseup", function() {
  isDrawing = false;
});



// Set up the stroke width select element
var strokeWidthSelect = document.getElementById("stroke-width");

// Add an event listener that updates the lineWidth property of the drawing context
// when the user selects a new option
strokeWidthSelect.addEventListener("change", function() {
  ctx.lineWidth = strokeWidthSelect.value;
});

// Set up the download button
var downloadBtn = document.getElementById("download-btn");

// Set up an event listener for the click event of the download button
document.getElementById("download-btn").addEventListener("click", downloadImage);


// Set up the stroke color input element
var strokeColorInput = document.getElementById("stroke-color");

// Add an event listener that updates the strokeStyle property of the drawing context
// when the user selects a new color
strokeColorInput.addEventListener("change", function() {
  ctx.strokeStyle = strokeColorInput.value;
});

// Set up an event listener for the resize event that updates the size of the canvas
window.addEventListener("resize", function() {
  // Update the width and height attributes of the canvas element
  canvas.setAttribute("width", window.innerWidth);
  canvas.setAttribute("height", window.innerHeight);
});


// Set up the canvas element where the user can draw on the whiteboard
var canvas = document.getElementById("canvas");

// Set the width and height attributes of the canvas to the width and height of the browser window
canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);

function downloadImage() {
  // Get the image data from the canvas
  var imageData = canvas.toDataURL();

  // Create a new anchor element that will be used to download the image
  var link = document.createElement("a");

  // Set the href attribute of the anchor element to the image data
  link.href = imageData;

  // Set the download attribute of the anchor element to a file name
  link.download = "whiteboard.png";

  // Append the anchor element to the document
  document.body.appendChild(link);

  // Click the anchor element to start the download
  link.click();

  // Remove the anchor element from the document
  document.body.removeChild(link);
}

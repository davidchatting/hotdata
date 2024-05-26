function setup() {
  // make it full screen
  createCanvas(windowWidth, windowHeight); 
  background(200, 0, 0);
}

function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);
}

function touchStarted() {
  // prevent default scrolling behavior 
  return false;
}
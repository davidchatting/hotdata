let tempString = '?'

function setup() {
  // make it full screen
  createCanvas(windowWidth, windowHeight); 
  background(200, 0, 0);

  setInterval(temp, 1000);
}

function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);
  fill(0);
  text(tempString, mouseX, mouseY)
}

function touchStarted() {
  // prevent default scrolling behavior 
  return false;
}

const tick = async _ => {
  console.log('tick');
  const response = await fetch('/tick');
  const data = await response.json();
  console.log(data);
}

const temp = async _ => {
  const response = await fetch('/temp');
  const data = await response.json();

  tempString = data['temp']
}
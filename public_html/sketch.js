const ScrollType = {
  NoScroll: 0,
  UpScroll: 1,
  DownScroll: 2,
};
let currentScroll = ScrollType.NoScroll;

let font;
function preload() {
  font = loadFont("SpaceMono-Regular.ttf");
}
let fontHeightPixel = 30;

let charHeightPixel, charWidthPixel;
let screenWidthChar, screenHeightChar;

let index = 0;
let charBuffer = [];
let track = [];

function setup() {
  createCanvas(windowWidth, windowHeight);   // make it full screen
  
  textFont(font);
  textSize(fontHeightPixel);

  let charBounds = font.textBounds("XX", 0, 0);
  charWidthPixel = ceil(charBounds.w) / 2;
  charHeightPixel = textLeading();

  screenWidthChar = floor(width / charWidthPixel) - 1;
  screenHeightChar = floor(height / charHeightPixel);

  let arrayLength = screenWidthChar * screenHeightChar;
  for (let i = 0; i < arrayLength; i++) {
    charBuffer[i] = "-";
  }

  setInterval(tick, 1000);
}

function draw() {
  background(20)
  fill(200)
  stroke(200)

  if (currentScroll == ScrollType.DownScroll) {
  }
  else if (currentScroll == ScrollType.UpScroll) {
    addText("Yes");
  }

  let s = join(charBuffer, "");
  textWrap(CHAR);
  text(s, 0, charHeightPixel, width, height);
}

function addText(s) {
  //Remove top line if scrolling too far:
  if (index >= screenWidthChar * screenHeightChar) {
    for (let n = 0; n < screenWidthChar; ++n) {
      charBuffer.shift();
      index--;
    }
  }

  //Place the text in the charBuffer (use the track if available)
  for (let i = 0; i < s.length; ++i) {
    let n = track.length > 0 ? track[index] : index;
    charBuffer[n] = s[i];
    ++index;
  }
}

const tick = async _ => {
  const response = await fetch('/tick');
  const data = await response.json();
  console.log(data);

  addText(data['temp'] + '°C')
}

let lastTouchY = -1;
function touchStarted() {
  currentScroll = ScrollType.NoScroll;
  fetch('/yes?t=1');  //don't await result

  if(event.touches) {
    lastTouchY = event.touches[0].clientY;
  }
  else lastTouchY = mouseY;

  return false; //prevent default behavior 
}

function touchMoved(event) {
  let touchY = -1;
  
  if(event.touches) {
    touchY = event.touches[0].clientY;
  }
  else touchY = mouseY;

  let dTouchY = touchY - lastTouchY;
  if (currentScroll == ScrollType.NoScroll) {
    if (dTouchY > 0) {
      currentScroll = ScrollType.DownScroll;
    } else if (dTouchY < 0) {
      currentScroll = ScrollType.UpScroll;
    }
  }

  return false;   // prevent default behavior 
}

function touchEnded() {
  currentScroll = ScrollType.NoScroll;

  return false;   // prevent default behavior 
}

function mouseWheel(event) {
  return false;
}
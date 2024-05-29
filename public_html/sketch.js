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
let fontHeightPixel = 20;

let charHeightPixel, charWidthPixel;
let screenWidthChar, screenHeightChar;

let index = 0;
let charBuffer = [];
let track = [];

function setup() {
  frameRate(30)
  createCanvas(windowWidth, windowHeight);   // make it full screen
  
  textFont(font);
  textSize(fontHeightPixel);

  //This only works because this is a monospaced typeface
  charWidthPixel = font.textBounds("XX", 0, 0).w - font.textBounds("X", 0, 0).w;
  charHeightPixel = textLeading();

  screenWidthChar = ceil(width / charWidthPixel) - 1;
  screenHeightChar = ceil(height / charHeightPixel) - 1;

  let arrayLength = screenWidthChar * screenHeightChar;
  for (let i = 0; i < arrayLength; i++) {
    charBuffer[i] = random(['-', 'x', 'o'])
  }
  charBuffer[0] = '+'
  charBuffer[arrayLength -1] = '+'
  index = arrayLength

  console.log(screenWidthChar, screenHeightChar)

  setInterval(tick, 1000);
}

function draw() {
  background(20)
  fill(200)
  stroke(200)

  if (currentScroll == ScrollType.UpScroll) {
    addText("Yes");
  }

  let s = join(charBuffer, "");
  textWrap(CHAR);
  text(s, 0, charHeightPixel, width, height);
}

function addText(s) {
  //Remove top line if scrolling too far:
  if (index >= screenWidthChar * screenHeightChar) {
    removeText(screenWidthChar)
  }

  //Place the text in the charBuffer (use the track if available)
  for (let i = 0; i < s.length; ++i) {
    let n = track.length > 0 ? track[index] : index;
    charBuffer[n] = s[i];
    ++index;
  }
}

function removeText(numOfChars) {
  for (let n = 0; n < numOfChars; ++n) {
    charBuffer.shift()
  }
  index -= numOfChars
}

const tick = async _ => {
  const response = await fetch('/tick');
  const data = await response.json();
  //console.log(data);

  let temp = 0
  if(data['temp']) temp = data['temp']
  addText(temp + '°C')
}

let lastTouchY = -1
let firstTouchY = -1
function touchStarted() {
  currentScroll = ScrollType.NoScroll;
  fetch('/yes?t=3');  //don't await result

  firstTouchY = getTouchXY()[1]
  lastTouchY = firstTouchY

  return false; //prevent default behavior 
}

function touchMoved(event) {
  let touchY = getTouchXY()[1]

  let d = touchY - lastTouchY
  if (d > 0) {
    currentScroll = ScrollType.DownScroll;
  } else if (d < 0) {
    currentScroll = ScrollType.UpScroll;
  }

  if (currentScroll == ScrollType.DownScroll) {
  }
  else if (currentScroll == ScrollType.UpScroll) {
    if(abs(touchY - firstTouchY) > charHeightPixel) {
      removeText(screenWidthChar)
      firstTouchY = touchY
    }
  }
  lastTouchY = touchY

  return false;   // prevent default behavior 
}

function touchEnded() {
  currentScroll = ScrollType.NoScroll;

  return false;   // prevent default behavior 
}

function getTouchXY(){
  if(event.touches && event.touches.length > 0) {
    return([event.touches[0].clientX, event.touches[0].clientY])
  }
  else return([mouseX,mouseY])
}

function mouseWheel(event) {
  return false;
}
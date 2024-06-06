const ScrollType = {
  NoScroll: 0,
  UpScroll: 1,
  DownScroll: 2,
};
let currentScroll = ScrollType.NoScroll

let font;
function preload() {
  font = loadFont("SpaceMono-Regular.ttf")
}
let fontHeightPixel = 20

let charHeightPixel, charWidthPixel
let screenWidthChar, screenHeightChar

let lines
let lineOffsets

let amplitude = 0

function setup() {
  frameRate(30)
  createCanvas(windowWidth, windowHeight) // make it full screen
  
  textFont(font)
  textSize(fontHeightPixel)

  //This only works because this is a monospaced typeface
  charWidthPixel = font.textBounds("XX", 0, 0).w - font.textBounds("X", 0, 0).w
  charHeightPixel = textLeading()

  screenWidthChar = ceil(width / charWidthPixel) - 1
  screenHeightChar = ceil(height / charHeightPixel) - 1

  lines = new Array(screenHeightChar)
  lineOffsets = new Array(lines.length);
  for(let i=0;i<lineOffsets.length;++i) {
        lineOffsets[i] = 0
  }
  //lines[i] = random(['basic','garlic','captivate','berry','toast','vigorous','stereotype','salvation','director','expansion','bad','exact','sit','lump','hill'])  //['X','o','.'])
  
  setInterval(tick, 3000)
  addLine('hello')
}

function draw() {
  background(20)
  fill(200)
  stroke(200)

  calcWave();
  drawLines();
  
  amplitude = map(temperature,30,60,0,100)
}

function calcWave() {
  for (let i = lineOffsets.length-1; i > 0; i--) {
    lineOffsets[i] = lineOffsets[i-1]
  }
  lineOffsets[0] = amplitude * sin(frameCount * 0.15)
}

function drawLines() {
  noStroke();
  fill(255);
  for (let i = 0; i < lines.length; i++) {
    let x = lineOffsets[i]
    let y = (i * charHeightPixel) + charHeightPixel
    
    if(lines[i]) {
      text(lines[i], (width/2)+x, y)
    }
  }
}

function addLine(s) {
  while(lines.length > screenHeightChar) lines.shift()
  lines.push(s)
}

function appendText(s) {
  // //Remove top line if scrolling too far:
  // if (index >= screenWidthChar * screenHeightChar) {
  //   removeText(screenWidthChar)
  // }
  // index = addTextAtIndex(s, index)
}

function removeText(numOfChars) {
  // for (let n = 0; n < numOfChars; ++n) {
  //   charBuffer.shift()
  // }
  // index -= numOfChars
}

let temperature = 40
const tick = async _ => {
  const response = await fetch('/tick');
  const data = await response.json();

  let dt = random(0,4)
  let temp = int(temperature - 2 + dt)
  if(data['temp']) temp = data['temp']
  addLine('_' + temp + '°C' + '_')
}


//Touch functions
//===============
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
      //removeText(screenWidthChar)
      addLine('yes.')
      firstTouchY = touchY
    }
  }
  lastTouchY = touchY

  return false;   // prevent default behavior 
}

function touchEnded() {
  currentScroll = ScrollType.NoScroll;
  addLine('no.')

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
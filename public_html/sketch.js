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
let scrollCounter = 0
let clickCounter = 0
let userWork = 0
const workRateInterval = 500
const stressInterval = 5000

let serverTemperature = 0
const targetAmbientTemperature = 48
const userWorkThresholdForFan = 0.2

let serverOnline = undefined

function setup() {
  console.log('Hot Data')
  frameRate(30)
  createCanvas(windowWidth, windowHeight) // make it full screen
  
  textFont(font)
  textSize(fontHeightPixel)

  //This only works because this is a monospaced typeface
  charWidthPixel = font.textBounds("XX", 0, 0).w - font.textBounds("X", 0, 0).w
  charHeightPixel = textLeading()

  screenWidthChar = ceil(width / charWidthPixel) - 1
  screenHeightChar = ceil(height / charHeightPixel) - 1

  lines = []
  lineOffsets = []
  for(let i=0;i<lineOffsets.length;++i) {
        lineOffsets[i] = 0
  }
  addLine('tHELLO')

  setInterval(tick, 5000)
  setInterval(measureUserWork, workRateInterval)
  setInterval(stress, stressInterval)
}

function draw() {
  amplitude = (amplitude * 0.8) + (0.2 * map(userWork,0,1,0,width * 0.5 * 0.5))
  calcWave();

  background(20)
  fill(200)
  stroke(200)

  push()
    translate(0, 0)
    drawLines()
  pop()
}

function calcWave() {
  for (let i = screenHeightChar-1; i > 0; i--) {
    lineOffsets[i] = lineOffsets[i-1]
  }
  lineOffsets[0] = amplitude * sin(frameCount * 0.15)
}

function drawLines() {
  noStroke();
  fill(255);
  textAlign(CENTER);

  let firstLineY = charHeightPixel + (screenHeightChar - lines.length) * charHeightPixel
  for (let i = 0; i < lines.length; i++) {
    let x = lineOffsets[i]
    let y = firstLineY + (i * charHeightPixel)
    
    let s = lines[i]
    if(s) {
      if(s.startsWith('t')) {
        
        fill(255, 71, 76)
        s = s.substring(1)
      }
      else fill(255,255,255)
      text(s, (width/2)+x, y)
    }
  }
}

function addLine(s) {
  while(lines.length > screenHeightChar - 1) lines.shift()
  lines.push(s)
}

const tick = async _ => {
  const response = await fetch('/tick')
  .then(async (response) => {
    if(response.ok) {
      setServerStatus(true)
      const data = await response.json()
      console.log(data)
      if(data['temp']) serverTemperature = data['temp']
      addTemperatureLine(serverTemperature)
    }
    else setServerStatus(false)
  })
  .catch((error) => {
    setServerStatus(false)
  })
}

function addTemperatureLine() {
  let prefix = (random(100) > 40 && userWork > 0) ? 'SERVER TEMP. ' : ''
  addLine('t' + prefix + serverTemperature + '°C')

  if(userWork == 0) {
    let arrows = '^^^^^^^'
    addLine(arrows.substring(int(random(arrows.length))));
  }
}

function setServerStatus(s) {
  if(serverOnline!=s) {
    if(s) addLine('tSERVER ONLINE')
    else addLine('tSERVER OFFLINE')
    serverOnline = s
  }
}

function measureUserWork() {
  let w = max(scrollCounter/workRateInterval, (clickCounter*50)/workRateInterval)

  userWork = (0.8 * userWork) + (0.2 * w)
  userWork = (userWork > 0.01) ? userWork : 0
  scrollCounter = 0
  clickCounter = 0
}

function stress() {
  let url = '/stress?'
  let fan = userWork > userWorkThresholdForFan

  if(serverTemperature < targetAmbientTemperature || fan){
    url += 't='+(stressInterval/1000)+'&'
  }
  url += 'fan=' + fan
  fetch(url)  //don't await result
}

//Touch functions
//===============
let lastTouchY = -1
let firstTouchY = -1
function touchStarted() {
  currentScroll = ScrollType.NoScroll;

  firstTouchY = getTouchXY()[1]
  lastTouchY = firstTouchY

  return false; //prevent default behavior 
}

function touchMoved(event) {
  let touchY = getTouchXY()[1]

  let d = touchY - lastTouchY
  if(d<0) scrollCounter += abs(d) //only scroll up

  if (d > 0) {
    currentScroll = ScrollType.DownScroll;
  } else if (d < 0) {
    currentScroll = ScrollType.UpScroll;
  }

  if (currentScroll == ScrollType.DownScroll) {
  }
  else if (currentScroll == ScrollType.UpScroll) {
    if(abs(touchY - firstTouchY) > charHeightPixel) {
      addYes()
      firstTouchY = touchY
    }
  }
  lastTouchY = touchY

  return false;   // prevent default behavior 
}

function addYes() {
  string1 = randomDataString(5)
  string2 = dataString(5 - string1.length)
  addLine(string1 + 'Yes' + string2)
}

function dataString(length) {
  let string = '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
  return(string.substring(0,length))
}

function randomDataString(maxLength) {
  return dataString(random(maxLength))
}

function touchEnded() {
  currentScroll = ScrollType.NoScroll;
  let touchY = getTouchXY()[1]
  let d = touchY - firstTouchY
  if (d == 0) {
    clickCounter++
    addYes()
  } 
  else addLine('~~~~~No.')

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
const express = require('express')
const app = express()

const cp = require('child_process')
const port = 8080

app.use(express.static('public_html'))

app.get('/stress', (req, res) => {
  console.log('/stress', req.url)

  let fanActive = false
  if(req.query.fan) fanActive = (req.query.fan == 'true')
  setFan(fanActive)

  if(req.query.t) {
    let timeSec = Number.parseInt(req.query.t)
  
    let command = 'stress -c 4 -t ' + timeSec + 's'
    cp.exec(command, (err, stdout, sterr) => {})
  }

  res.sendStatus(200)
})

function setFan(value) {
  let command = 'raspi-gpio set 4 ' + (value ? 'dh' : 'dl')
  cp.exec(command, (err, stdout, sterr) => {})
}

app.get('/tick', (req, res) => {
  let result = {tock:true}

  cp.exec('vcgencmd measure_temp', (err, stdout, sterr) => {
    if(!err) {
      let s = stdout.trim().split('=')
      if(s.length == 2) {
        result[s[0]] = Number.parseFloat(s[1])
      }
    }
    console.log(result)
    res.json(result)
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


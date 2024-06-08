const express = require('express')
const app = express()
const cp = require('child_process')
const port = 8080

app.use(express.static('public_html'))

app.get('/stress', (req, res) => {
  console.log('/stress', req.url)

  let fanActive = false
  if(req.query.fan) fanActive = (req.query.fan == 'true')
  console.log('fanActive', fanActive)

  if(req.query.t) {
    let timeSec = Number.parseInt(req.query.t)
  
    let command = 'stress -c 4 -t ' + timeSec + 's'
    cp.exec(command, (err, stdout, sterr) => {
      if(!err) {
        res.sendStatus(200)
      }
      else {
        console.log(err)
        res.sendStatus(500)
      }
    })
  }
})

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


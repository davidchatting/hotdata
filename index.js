const express = require('express')
const app = express()
const cp = require('child_process')
const port = 8080

app.use(express.static('public_html'))

app.get('/yes', (req, res) => {
  cp.exec('stress -c 4 -t 20s', (err, stdout, sterr) => {
    if(err) {
      console.log(err)
      res.sendStatus(500)
      return
    }
    console.log(stdout)
    res.json({message:stdout})
  })
})

app.get('/tick', (req, res) => {
  let result = {tock:true};

  cp.exec('vcgencmd measure_temp', (err, stdout, sterr) => {
    if(!err) {
      let s = stdout.trim().split('=')
      if(s.length == 2) {
        result[s[0]] = s[1]
      }
    }
    res.json(result)
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


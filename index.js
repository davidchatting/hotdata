const express = require('express')
const app = express()
const cp = require('child_process')
const port = 8080

app.use(express.static('public_html'))

app.get('/stress', (req, res) => {
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
  cp.exec('vcgencmd measure_temp', (err, stdout, sterr) => {
    if(err) {
      console.log(err)
      res.sendStatus(500)
      return
    }
    console.log(stdout)
    res.json({message:stdout})
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


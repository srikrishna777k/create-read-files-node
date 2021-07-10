const path = require('path')
const fs = require('fs')
const http = require('http')
var txtFiles = []
var dir = path.join(__dirname, 'newFiles')

//get the current time
var dates = new Date()
var dateTime =
  dates.getDate() +
  '.' +
  dates.getMonth() +
  '.' +
  dates.getFullYear() +
  '-' +
  dates.getHours() +
  '.' +
  dates.getMinutes() +
  '.' +
  dates.getSeconds()

//check if newFiles folder exists and create
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}

//write a txt file with current timestamp into the location
fs.writeFile(
  path.join(dir, `${dateTime}.txt`),
  `Timestamp - ${Date.now()}`,
  (err) => {
    if (err) throw err
    console.log('created')
  }
)

//filter out non txt files if they exist
fs.readdir(dir, (err, files) => {
  if (err) throw err
  txtFiles = files.filter((file) => file.includes('.txt'))
  console.log(txtFiles)
})

//create http server and send the textfiles as response
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.write(
    '<h1>File will be created in folder called newFiles, listed below</h1>'
  )
  res.end(`<h2>${txtFiles}</h2>`)
})

const PORT = process.env.PORT || 8000

server.listen(PORT, () => console.log('server started'))

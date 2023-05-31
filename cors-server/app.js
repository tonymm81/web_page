
const express = require('express');
const app = express();
//app.get('/', (req, res) => {
 //   res.send('Welcome to CORS server 😁')
//})
//app.get('/cors', (req, res) => {
 //   res.send('This has CORS enabled 🎈')
//})

app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');//http://localhost:3000/News_page
    res.send({ "msg": "This has CORS enabled 🎈" })
    })
app.listen(8080, () => {
   console.log('listening on port 8080')
})

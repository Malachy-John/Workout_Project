

const express = require('express');
const app = express();
const path = require('path');
//const PORT = process.env.PORT || 4000;
const PORT = 4000;
const bodyParser = require('body-parser');
var cors = require('cors')
const fs = require('fs')

const router = express.Router();

// Static Middleware
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, '/public')))


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', function (req, res, next) {
  res.render('index.html');
})
//app.use(bodyParser.urlencoded({ extended: true }));

app.get('/saved_workouts.json', function (req, res, next) {
  //res.render('index.html');
  res.sendFile(path.join(__dirname, 'saved_workouts.json'));

})


app.post('/post-test', (req, res) => {
  console.log('Got body:', req.body);
  res.sendStatus(200);
  var requested_val = JSON.stringify(req.body, null, 2);

  console.log(req.body)

  fs.writeFileSync('../saved_workouts.json', requested_val)
  //fs.writeFile('../saved_workouts.json', requested_val);

});

//app.post('/', function (req, res) {
//  console.log(req.body.name)
//  res.end();
//})


app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});





module.exports = router;
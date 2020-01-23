'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
const fileUpload = require('express-fileupload')
// require and use "multer"...

var app = express();

app.use(cors());
app.use(fileUpload());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', function(req, res) {
  
  // check if a file was uploaded, if not throw error
  if (!req.files) {
    throw new Error('No files uploaded')
  }

  let returnObj = {
    name: req.files.upfile.name,
    type: req.files.upfile.mimetype,
    size: req.files.upfile.size
  }
  
  res.json(returnObj);
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});

var jsonServer = require('json-server');
var multer = require('multer');
var express = require('express');
var path = require('path');
var crypto = require('crypto');

var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
var storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err);

      cb(null, raw.toString('hex') + path.extname(file.originalname));
    });
  }
});
var upload = multer({ storage: storage });

server.use(middlewares);
server.use('/uploads', express.static('uploads'));

server.post('/auth/login', function (req, res) {
  var loginSucces = router.db.get('loginSucces');
  var loginError = router.db.get('loginError');

  if (req.body.username === 'invalid@invalid.invalid') {
    res.status(400).jsonp(loginError);
  } else {
    res.jsonp(loginSucces);
  }
})

server.post('/upload/accounts', function (req, res) {
  var success = router.db.get('accountsHardcoded');
  res.jsonp(success);
})

server.use(router);

var port = process.env.PORT || 3000;
server.listen(port, function () {
  console.log('JSON Server is running on port ' + port);
});

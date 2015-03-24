var express = require('express');
var router = express.Router();
var log = require('../service/MongoService');

/* GET home page. */
router.get('/', function(req, res, next) {

  log.find(function(err,doc){
  	debugger;
  	res.render('index', { title: 'Express',content:doc});
  });
  
});

module.exports = router;

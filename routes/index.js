var express = require('express');
var router = express.Router();
var mongoConnection = require('../service/MongoService');
var moment = require('moment');
var ejs = require('ejs');

/*
ejs.set('dateformat',function(obj,format){
	if (format == undefined) {
        format = 'YYYY-MM-DD HH:mm:ss';
    }
    var ret = moment(obj).format(format);
    return ret == 'Invalid date' ? '0000-00-00 00:00:00' : ret;
});
*/


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});


/* GET home page. */
router.post('/get', function(req, res, next) {
	var criteria = {};
	mongoConnection.findByPageDesc(criteria,0,50,function(err,doc){
		debugger;
		res.json(doc);
	});
});
router.post('/search', function(req, res, next) {
	var criteria = {};

	if(req.body.daterange){
		var start = new Date(req.body.daterange.replace(/-/g,'/'));
		var dayTime = 1000*60*60*24;
		var end = new Date(start.getTime()+dayTime);
		criteria.date ={'$lt':end,'$gte':start};
	}

	//criteria.level = {$in:bdlevel};
	if(req.body.keyword){
		criteria.message = new RegExp(req.body.keyword);
	}
	mongoConnection.findByPage(criteria,0,50,function(err,doc){
		res.json(doc);
	});
});

router.post('/through', function(req, res, next) {
	var criteria = {};
	mongoConnection.findByPage(criteria,req.body.skip,req.body.limit,function(err,doc){
		res.json(doc);
	});
});

router.post('/count', function(req, res, next) {
	var criteria = {};
	mongoConnection.count(criteria,function(err,doc){
		res.json({'count':doc});
	});
});

router.post('/skip', function(req, res, next) {
	mongoConnection.findSkip(req.body.objectId,function(err,doc){
		res.json({'skip':doc});
	});
});


module.exports = router;

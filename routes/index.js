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
		res.json(doc);
	});
});

router.post('/search', function(req, res, next) {
	var criteria = {};
	criteria.date={'$gte':new Date("2015-04-01"),'$lt':new Date("2015-04-18")};
	//criteria.level = {$in:bdlevel};
	if(req.body.keyword){
		criteria.message = new RegExp(req.body.keyword);
	}
	mongoConnection.findByPageAsc(criteria,0,50,function(err,doc){
		res.json(doc);
	});
});


router.post('/through', function(req, res, next) {
	var criteria = {};
	criteria.date={'$gte':new Date("2015-04-01"),'$lt':new Date(req.body.logDate)};
	criteria._id = {'$ne':req.body.logId}
	mongoConnection.findByPageDesc(criteria,req.body.skip,req.body.limit,function(err,doc){
		res.json(doc);
	});
});


router.post('/through-prev', function(req, res, next) {
	var criteria = {};
	criteria.date={'$gte':new Date("2015-04-01"),'$lt':new Date(req.body.logDate)};
	criteria._id = {'$ne':req.body.logId}
	mongoConnection.findByPageDesc(criteria,req.body.skip,req.body.limit,function(err,doc){
		res.json(doc);
	});
});


router.post('/through-next', function(req, res, next) {
	var criteria = {};
	criteria.date={'$gte':new Date(req.body.logDate),'$lt':new Date("2015-04-18")};
	criteria._id = {'$ne':req.body.logId}
	mongoConnection.findByPageAsc(criteria,req.body.skip,req.body.limit,function(err,doc){
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

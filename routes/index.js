var express = require('express');
var router = express.Router();
var mongoConnection = require('../service/MongoService');
var moment = require('moment');
var ejs = require('ejs');

console.log(ejs);
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
	mongoConnection.find({},0,10,function(err,doc){
		res.render('index', {'content':doc});
	});
});

router.post('/', function(req, res, next) {
	var criteria = {};
	
	console.log(req.body.dataTime);
	//criteria.level = {$in:bdlevel};
	if(req.body.keyword){
		criteria.message = new RegExp(req.body.keyword);
	}
	mongoConnection.find(criteria,0,50,function(err,doc){
		res.json(doc);
	});
});
module.exports = router;

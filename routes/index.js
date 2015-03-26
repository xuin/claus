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
router.all('/', function(req, res, next) {
	var criteria = {};
	var bdlevel =  typeof req.body.level == 'string'?[req.body.level]:req.body.level,
		keyword = typeof req.body.keyword;

	if(req.body.level){
		criteria.level = {$in:bdlevel};
		criteria.message = new RegExp(keyword);
	}

	mongoConnection.find(criteria,0,50,function(err,doc){
		res.render('index', {'content':doc,'criteria':criteria});
	});
});
module.exports = router;

var mongoose = require('mongoose');
//mongoose.connect('mongodb://logdb:123456@172.16.230.184:30000/logdb');
mongoose.connect('mongodb://127.0.0.1:27017/logdb');
//var db = mongoose.createConnection('mongodb://logdb:123456@172.16.230.184:30000/logdb');

//mongoose.connect('mongodb://127.0.0.1:27017/logdb');

var Schema = mongoose.Schema;

var LogSchema = new Schema({
	level:String,
	loggerName:String,
	message:String,
	source:{},
	marker:String,
	threadName:String,
	millis:Number,
	date:Date,
	thrown:String,
	contextMap:{},
	contextStack:[]
});

var trident = mongoose.model('Trident',LogSchema,'trident');

/*
var l1jj = new trident({
	level:'DEBUG',
	loggerName:'com.logger',
	message:'错误消息',
	source:{},
	marker:'smdx',
	threadName:'xom.askk.l',
	millis:19209918,
	date:new Date(),
	thrown:'aasdekljiuo',
	contextMap:{},
	contextStack:[]
});

l1jj.save();
*/


trident.find({'message':new RegExp('错')}).exec(function(err,doc){
	console.log(doc)
});


exports.find = function(criteria,skip,limit,call){
	trident.find(criteria).skip(skip).limit(limit).exec(call);
};
var mongoose = require('mongoose');
mongoose.connect('mongodb://logdb:123456@172.16.230.184:30000/logdb');
//var db = mongoose.createConnection('mongodb://logdb:123456@172.16.230.184:30000/logdb');

//mongoose.connect('mongodb://127.0.0.1:27017/logdb');

var Schema = mongoose.Schema;

var logSchema = new Schema({
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

var trident = mongoose.model('Trident',logSchema,'trident');

exports.find = function(criteria,skip,limit,call){
	trident.find(criteria).skip(skip).limit(limit).exec(call);
};
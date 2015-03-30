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
for(var i = 1 ;i<100;i++){
	var l1jj = new trident({
	level:'DEBUG',
	loggerName:'com.logger'+i,
	message:'错误消息'+i,
	source:{},
	marker:'smdx'+i,
	threadName:'xom.askk.l'+i,
	millis:19209918,
	date:new Date(),
	thrown:'aasdekljiuo'+i,
	contextMap:{},
	contextStack:[]
});
l1jj.save();
}

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


exports.find = function(criteria,skip,limit,call){
	trident.find(criteria).skip(skip).limit(limit).sort({date:'desc'}).exec(call);
};
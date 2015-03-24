var mongoose = require('mongoose');
mongoose.connect('mongodb://172.16.230.184:30000/logdb');

var Schema = mongoose.Schema ,
    ObjectId = Schema.ObjectId;

var logSchema = new Schema({
	lavel : String ,
	message : String
});

exports.find=function(call){
	mongoose.model('trident',logSchema).find({},call);
};
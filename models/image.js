var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var img_schema = new Schema({
	title:{
		type:String,
		required:true
	}
});

var Image = mongoose.model('Image', img_schema);

module.exports = Image;
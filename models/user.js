var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
mongoose.connect('mongodb://127.0.0.1:27017/users');

var user_schema = new Schema({
	name: {
		type: String,
		required: [true, 'El Nombre es Requerido'],
		maxlength: [50, 'Nombre Muy Largo'],
		minlength:[7,'Nombre Muy Corto']

	},
	username: {
		type: String,
		required: [true, 'El Nick es Requerido'],
		maxlength: [50, 'Nick Muy Largo'],
		minlength:[7,'Nick Muy Corto']
	},
	password: {
		type: String,
		required: [true, 'El Correo es Requerido'],
		validate:{
			validator:function (p) {
				return this.password_confirmation == p
			},
			message:'Las contraseñas no Coinciden'
		}
	},
	age: {
		type: Number,
		min: [18, 'Eres Menor de Edad']
	},
	email: {
		type: String,
		required: [true, 'El Correo es Requerido'],
		match:[/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/,"El Email no es Valido"],

	},
	date_of_birth: Date
});

user_schema.virtual('password_confirmation').get(function() {
	return this._password_confirmation
}).set(function(password) {
	this._password_confirmation = password
});
var User = mongoose.model('User', user_schema);

module.exports.User = User;
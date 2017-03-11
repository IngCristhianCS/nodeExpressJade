var express = require('express'),
	bodyParser = require('body-parser'),
	User = require('./models/user').User,
	session = require('express-session'),
	router_app = require('./routes_app')
	session_middleware = require('./middleware/session');

var app = express();
//app.use(express.static['public']);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(session({
	secret: '12resgr45ehtr',
	resave: false,
	saveUninitialized:false
}));
app.set('view engine', 'jade');

app.get('/', function(req, res) {
	res.render('index');
});
app.get('/login', function(req, res) {
	res.render('login');
});
app.get('/register', function(req, res) {
	res.render('register');
});
app.post('/sessions', function(req, res) {
	User.findOne({
		email: req.body.email,
		password: req.body.password
	},function(err, user) {
		req.session.user = user._id;
		res.redirect('/app');
	})
});
app.post('/save', function(req, res) {
	var user = new User({
		email: req.body.email,
		password: req.body.password,
		password_confirmation: req.body.password_confirmation,
		username: req.body.username,
		name: req.body.name,
		age: req.body.age
	});
	user.save().then(function(user) {
		res.send('ok');
	}, function(err) {
		res.send('error')
	});

});
app.use('/app', session_middleware);
app.use('/app', router_app);
app.listen(3000);
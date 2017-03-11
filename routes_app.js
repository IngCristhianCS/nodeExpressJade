var express = require('express'),
	router = express.Router(),
	Image = require('./models/image');

router.get('/', function(req, res) {
	res.render('app/index');
});
router.get('/imagenes/new', function(req, res) {
	res.render('app/form/imagen');
})
router.get('/imagenes/:id/edit', function(req, res) {
	res.render('app/form/imagen');
})
	/*Rest*/
router.route('/imagenes/:id')
	.get(function(req, res) {
		Image.findById(req.params.id, function (err, image) {
			
		res.render('app/show',{image:image})
		})
	})
	.put(function(req, res) {

	})
	.delete(function(req, res) {

	});

router.route('/imagenes')
	.get(function(req, res) {
		res.send('hola Imagenes get');
	})
	.post(function(req, res) {
		var data = {
			title: req.body.title
		}
		var image = new Image(data);
		image.save(data, function(err) {
			if (!err) {
				res.redirect('/app/imagenes/' + image._id)
			}
		})
	});

module.exports = router;
/**
 * Created by James Lynn on 6/10/2015.
 */
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var less = require('less-middleware');
var email = require('emailjs');

var app = express();

app.set('env', process.env.NODE_ENV);
app.set('port', process.env.PORT || '80');

switch (app.get('env'))
{
	case 'production':
		app.use(bodyParser.json())
		app.use(express.static(path.join(__dirname, 'dist')));
		break;

	default :
		app.use(less(path.join(__dirname,'src'),{
			preprocess: {
				path: function(value) {
					return value.replace(/(?:\/css|\\css)/, '');
				}
			},
			dest : path.join(__dirname, 'src'),
			compress : false,
			debug : true,
			force : true
		}));

		app.use(bodyParser.json());
		app.use(express.static(path.join(__dirname,'src')));
		break;
}

var emailServer  = email.server.connect({
	host: 'localhost',
	domain : 'estructor.com'
});

app.post('/mail', function(req, res, next){

	'use strict';

	var form = req.body;
	if (!form || !form.email || !form.name || !form.message || form.secret != 12){
		return res.status(400).send('Invalid parameters');
	}

	var subject = form.name +  (form.company?' - '+form.company : '');
	var body = form.email+'\n\n' + (form.phone ? form.phone + '\n\n' : '') + form.message;

	emailServer.send({
		to : 'jamespdlynn@gmail.com',
		from : 'Contact Form <contact@destructor.com>',
		subject : subject,
		text : body
	}, function(err){
		if (err) return next(err);
		res.status(200).send();
	});

});

app.listen(app.get('port'), function(){
	'use strict';
	console.log('Express '+app.get('env')+' server listening on port '+app.get('port'));
});



/**
 * Node JS Server
 * @author James Lynn
 */
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

//Attempts to connect to an unauthenticated mail server on the local host
var emailServer = require('emailjs').server.connect({host:'localhost'});
var pkg = require('./package.json');

var app = express();

app.set('env', process.env.NODE_ENV);
app.set('port', process.env.PORT || '80');

switch (app.get('env'))
{
	//In a production environment point the requests to the 'dist' directory
	//that should have been deployed by Grunt
	case 'production':
		app.use(bodyParser.json());
		app.use(express.static(path.join(__dirname, 'dist')));
		break;

	//In a development environment use the less-middleware module to manually compile
	//the LESS files on each request and
	default :
		var less = require('less-middleware');
		app.use(less(path.join(__dirname,'src'),{
			dest : path.join(__dirname, 'src'),
			compress : false,
			debug : true,
			force : true
		}));

		app.use(bodyParser.json());
		app.use(express.static(path.join(__dirname,'src')));
		break;
}

//Contact data email endpoint
app.post('/mail', function(req, res, next){

	'use strict';

	var data = req.body;

	//Do some very basic validation on the incoming data object
	if (!data || !data.email || !data.name || !data.message || data.secret != 12){
		return res.status(400).send('Invalid data params');
	}

	var subject = 'New Contact Form Submitted';
	var body = data.name + '\n\n' +
	     data.company ? + data.company + '\n\n' : '' +
		 data.email+'\n\n' +
		 data.phone ? data.phone + '\n\n' : '' +
		 data.message;

		emailServer.send({
			to : pkg.author,
			subject : subject,
			text : body
		}, function(err){
			if (err){
				return next(err);
			}
			res.status(200).send('success');
		});
});

//Kick up a new express server on the given port (default 80)
app.listen(app.get('port'), function(){
	'use strict';
	console.log('Express '+app.get('env')+' server listening on port '+app.get('port'));
});



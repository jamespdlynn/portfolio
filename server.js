/**
 * Node JS Server
 * @author James Lynn
 */
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var emailjs = require('emailjs');
var mail = require('./mail.json');

//Attempts to connect to an unauthenticated mail server on the local host
var emailServer = emailjs.server.connect({host : mail.host, port : mail.port});

var app = express();

app.set('env', process.env.NODE_ENV || 'development');
app.set('port', process.env.PORT || '80');

switch (app.get('env'))
{
	//Production Environment
	case 'production':
		//crawlme module used to allow google to crawl ajax links
		var crawl = require('crawlme');
		app.use(crawl());

		app.use(bodyParser.json());
		//point http requests to the 'dist' directory which should have been generated by the grunt build
		app.use(express.static(path.join(__dirname, 'dist')));
		break;

	//Development Environment
	default :

		// use the less-middleware module to manually compile the LESS files on each request and
		var less = require('less-middleware');
		app.use(less(path.join(__dirname,'src'),{
			dest : path.join(__dirname, 'src'),
			compress : false,
			debug : true,
			force : true
		}));

		app.use(bodyParser.json());
		//Point http requests directory to the source directory
		app.use(express.static(path.join(__dirname,'src')));
		break;
}

//Contact data email endpoint
app.post('/mail', function(req, res){
	'use strict';

	var data = req.body;

	//Do some very basic validation on the incoming data object
	if (!data || !data.name || !data.email || !data.message){
		return res.status(400).send('invalid data params');
	}

	emailServer.send({
		to : mail.recipient,

		from : data.name+'<'+mail.sender+'>',

		subject : 'New Contact Form Submitted',

		text :  data.name + '\n' +
				data.company + '\n' +
				data.email + '\n' +
				data.phone+ '\n\n' +
				data.message
	},
	function(err){
		if (err){
			console.error(err);
			res.status(500).send('error sending email');
		}else{
			res.status(200).send('success');
		}
	});
});

//Kick up a new express server on the given port (default 80)
app.listen(app.get('port'), function(){
	'use strict';
	console.log('Express '+app.get('env')+' server listening on port '+app.get('port'));
});



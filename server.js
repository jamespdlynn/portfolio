/**
 * Created by James Lynn on 6/10/2015.
 */
var http = require("http");
var path = require("path");
var express = require("express");
var bodyParser = require('body-parser');
var less = require("less-middleware");
var email = require("emailjs");

var app = express();

app.set('env', process.env.NODE_ENV);
app.set('port', process.env.PORT || '80');

switch (app.get('env'))
{
	case 'development':
	default :
		app.use(less(path.join(__dirname, 'less'),{
			preprocess: {
				path: function(value) {
					return value.replace(/(?:\/css|\\css)/, '');
				}
			},
			dest : path.join(__dirname, 'public'),
			compress : false,
			debug : true,
			force : true
		}));

		app.use(bodyParser.json())
		app.use(express.static(path.join(__dirname,'public')));

		break;

	case 'production':

		app.use(less(path.join(__dirname, 'less'),{
			preprocess: {
				path: function(pathname) {
					return pathname.replace(/(?:\/css\/|\\css\\)/, '/');
				}
			},
			dest : path.join(__dirname, 'public'),
			compress : true,
			once : true
		}));

		app.use(bodyParser.json())
		app.use(express.static(path.join(__dirname, 'public')));



		break;
}

var emailServer  = email.server.connect({
	host: "localhost"
});

app.post('/mail', function(req, res, next){

	var form = req.body;

	if (!form || !form.email || !form.name || !form.message || form.secret != 12){
		return res.status(400).send('Invalid parameters');
	}

	var subject, body;

	subject = "Contact Form Submission:" + form.name;
	if (form.company) subject += " - "+form.company;

	body = form.email+"\n\n";
	if (form.phone) body+= form.phone+"\n\n";
	body += form.message+"\n\n"

	emailServer.send({
		to : "jamespdlynn@gmail.com",
		from : "contact@destructorserver.com",
		subject : subject,
		text : body
	}, function(err){
		if (err) return next(err);
		res.status(200).send();
	});

});


app.listen(app.get('port'), function(){
	console.log("Express "+app.get('env')+" server listening on port "+app.get('port'));
});



/**
 * Created by James Lynn on 6/10/2015.
 */
var http = require("http");
var path = require("path");
var express = require("express");
var bodyParser = require('body-parser');
var less = require("less-middleware");

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

app.post('/mail', function(req, res, next){
	console.log(req.body);

	setTimeout(function(){
		res.send(200);
	}, 2000);
});


app.listen(app.get('port'), function(){
	console.log("Express "+app.get('env')+" server listening on port "+app.get('port'));
});



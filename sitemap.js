/**
 * NodeJS utility for dynamically building a crawlable google sitemap based on a states json configuration
 * @author James Lynn
 */
var requirejs = require('requirejs');
var builder = require('xmlbuilder');
var path = require('path');
var fs = require('fs');
var pkg = require('./package.json');

var args = require('minimist')(process.argv.slice(2));
var src =  path.join(__dirname, (args.src ||  args._[0] || 'src'));
var dest = path.join(__dirname, (args.dest || args._[1] || '.'));

var xml = builder.create('urlset');
xml.att('xmlns','http://www.sitemaps.org/schemas/sitemap/0.9')
xml.ele('url').ele('loc', pkg.homepage)

requirejs.config({
	baseUrl: path.join(src,'js/scripts')
});

//pull it requirejs states configuration data
requirejs(['config/states'], function($states){
	'use strict';

	var parseStates = function (states, root) {
		//create a new url xml element for each valid state
		states.forEach(function (state) {
			state.url = state.url || '/'+state.id;

			if (!state.isDefault && !state.abstract){
				xml.ele('url').ele('loc', {}, root+state.url); //Add url to sitemap
			}

			//recursively call function on substates
			if (state.states){
				parseStates(state.states, root+state.url);
			}
		});
	};

	parseStates($states, pkg.homepage+'#!');

	//save xml to destination directory
	fs.writeFile(path.join(dest,'sitemap.xml'), xml.toString({pretty:true}), function(err){
		if (err) throw err;
		console.log('sitemap generated');
		process.exit();
	});
});










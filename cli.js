#!/usr/bin/env node
'use strict';
const importJsx = require('import-jsx');
const { h, render } = require('ink');
const meow = require('meow');
const log = require('npmlog');

const App = importJsx('./src/app');
const tokenHelper = require('./src/services/token.helper');

const cli = meow(`
	Usage
	  $ cook [input]

	Options
	  --token  Spoonacular API token

	Examples
		$ cook --token=1a2b3c
		info Token saved: 1a2b3c
		$ cook eggs ham
		Square Deviled Eggs - [eggs, ham, cream cheese]
  	Japanese Corn Soup - [eggs, canned corn]
  	Scotch Eggs - [eggs, bulk sausage, corn meal]
`);
const token = cli.flags.token || tokenHelper.getToken();

if (cli.flags.token) {
	return tokenHelper.saveToken(cli.flags.token);
}

if (!token) {
	return log.error('No api key present, type help for more info :)');
}

render(h(App, cli.input));

# gamefic-driver

A Node library for connecting to Gamefic engines.

## Installation

    $ npm install gamefic-driver --save

## Usage

OpalDriver assumes that the app includes an Opal file built by Gamefic, e.g., for the Web, Webpack, or ReactApp platform. Example:

    import {OpalDriver} from 'gamefic-driver';

	driver = new OpalDriver();
	driver.start().then((response) => {
		console.log('The introduction: ' + response.output);
		driver.receive('a user command').then((response) => {
			console.log('The result: ' + response.output);
		});
	});

## TODO

Implement a WebDriver.

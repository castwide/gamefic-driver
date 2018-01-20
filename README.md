# gamefic-driver

A Node library for connecting to Gamefic engines.

## Installation

    $ npm install gamefic-driver --save

## Usage

### OpalDriver

The OpalDriver requires a JavaScript engine built by the Gamefic SDK, e.g.,
for the Web, Webpack, or ReactApp platform. The engine provides an `Opal`
constant that encompasses the compiled game. Example:

```Typescript
import {OpalDriver} from 'gamefic-driver';

let driver = new OpalDriver(Opal);

driver.start().then((response) => {
	console.log('The introduction: ' + response.output);
	driver.receive('a user command').then((response) => {
		console.log('The result: ' + response.output);
	});
});
```

### WebDriver

The WebDriver connects to a game through a web API. See the Gamefic SDK's
Server class for implementation details.

```Typescript
import {WebDriver} from 'gamefic-driver';

let driver = new WebDriver('http://example.com/path/to/game');

driver.start().then((response) => {
	console.log('The introduction: ' + response.output);
	driver.receive('a user command').then((response) => {
		console.log('The result: ' + response.output);
	});
});
```

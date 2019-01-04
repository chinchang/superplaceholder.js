
<img align="left" width="65px" height="100px" src="assets/logo.png"/>

superplaceholder.js [![npm version](https://badge.fury.io/js/superplaceholder.svg)](http://badge.fury.io/js/superplaceholder)
=====
*Super charge your input placeholders*
***

[DEMO](http://kushagragour.in/lab/superplaceholderjs) • [Installation](#installation) • [Usage](#usage)

superplaceholder.js is a library to bring your input placeholders to life by cycling multiple instructions in a single input placeholder.

![Demo](/assets/superplaceholder.gif)

Installation
-----

**superplaceholder.js** is *less than 1KB* minified & gzipped.

- **NPM**: `npm install superplaceholder`
- **Yarn**: `yarn add superplacholder`
- **Bower**: `bower install superplaceholder`
- [Download zip](https://github.com/chinchang/superplaceholder.js/archive/master.zip).

**Note**: **superplaceholder.js** supports AMD and commonJS module pattern out of the box.

Usage
-----

### Syntax

```js
superplaceholder({
	el: <target_input_element>,
	sentences: <array_of_texts>,
	options: {} // optional customizable parameters
});
```

### Basic

```js
superplaceholder({
	el: document.querySelector('input'),
	sentences: [ 'Something to show', 'Another thing to show']
});
```

### Customization

Pass an optional `options` object for custom settings.

```js
superplaceholder({
	el: document.querySelector('input'),
	sentences: [ 'Something to show', 'Another thing to show'],
	options: {
		// delay between letters (in milliseconds)
		letterDelay: 100, // milliseconds
		// delay between sentences (in milliseconds)
		sentenceDelay: 1000,
		// should start on input focus. Set false to autostart
		startOnFocus: true, // [DEPRECATED]
		// loop through passed sentences
		loop: false,
		// Initially shuffle the passed sentences
		shuffle: false,
		// Show cursor or not. Shows by default
		showCursor: true,
		// String to show as cursor
		cursor: '|',
		// Control onFocus behaviour. Default is `superplaceholder.Actions.START`
		onFocusAction: superplaceholder.Actions.[NOTHING|START|STOP]
		// Control onBlur behaviour. Default is `superplaceholder.Actions.STOP`
 		onBlurAction: superplaceholder.Actions.[NOTHING|START|STOP]
	}
});
```

Manually Controlling a superplaceholder instance:

```js
// Complete manual control
const instance = superplaceholder({
 el: document.querySelector('input'),
 sentences: [ 'Any format works', 'http://yahoo.com', 'www.facebook.com', 'airbnb.com' ],
 options: {
  onFocusAction: superplaceholder.Actions.NOTHING
  onBlurAction: superplaceholder.Actions.NOTHING
 }
});

// Later, whenever you want
instance.start();
instance.stop();
instance.destroy(); // to completely remove superplaceholder from an input
```

Browser Support
-----

**superplaceholder.js** works best on latest versions of Google Chrome, Firefox and Safari and Chrome mobile.

For all non-supported browsers, the library will graceful degradate without any explicit handling in your code.

Contributing
-----

Interested in contributing features and fixes?

[Read more on contributing](./CONTRIBUTING.md).

Changelog
-----

See the [Changelog](https://github.com/chinchang/superplaceholder.js/wiki/Changelog).

License
-----

Copyright (c) 2019 Kushagra Gour, https://kushagragour.in
This work is licensed under a [Creative Commons Attribution-NoDerivatives 4.0 International License](http://creativecommons.org/licenses/by-nd/4.0/).

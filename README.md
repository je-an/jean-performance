## Description

Provides functionality to measure performance time

## Support
Supports both CommonJS and AMD eco system. If there is no loader, Performance is registered as a browser variable.

## Code Example
- Use it as browser variable
```js
var obj = new Performance();
```
- Use it with require.js
```js
require(["path/to/Performance"], function(Performance){
    // Work with Performance
});
```
- Use it with node.js
```js
var Performance = require("jean-performance");
```
## Installation

`npm install jean-performance --save --legacy-bundling`

## API Reference

TBD

## Tests

- Open spec/spec-runner.html in browser to see the test cases.

## License

MIT
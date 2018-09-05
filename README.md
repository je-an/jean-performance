## Description

Provides functionality to measure performance time

## Support
Supports both CommonJS and AMD eco system. If there is no loader, Performance is registered as a browser variable.

## Code Example
- Use it as browser variable
```js
// The provided options are the default values
Performance.configure({
    // Unit for the display string
    measurementUnit: Performance.measurementUnit.SECOND,
    // True if the measurement result shall be printed, false otherwise
    printMeasurementResult: true,
    // Amount of numbers after comma
    decimalPlace: 2,
    // Gets called, when the measurement is finished. Provides the measurement time as a parameter
    onMeasurementFinished: function(measurementTime){
        // the measurement time in the provided Performance.measurementUnit
    }
});
// Start the performance measurement
Performance.startMeasurement();
// Call the function which shall be measured
doSomethingIntensive();
// Stop the performance measurement
Performance.stopMeasurement();
// console output: Measured time: xxx seconds.
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

### Performance.measurementUnit

**Parameters**
- **SECOND**: `Number` - value for seconds displayed in measurement string
- **MILLISECONDS**: `Number` - value for milliseconds displayed in measurement string

### Performance.configure(options) 

Configures the performance measurement

**Parameters**
- **options.measurementUnit**: `Performance.measurementUnit` - Unit for the result string
- **options.printMeasurementResult**: `Boolean` - True if the measurement result shall be printed to console, false otherwise
- **options.decimalPlace**: `Number` - Amount of numbers after comma
- **options.onMeasurementFinished**: `Function` - Gets called, when the measurement is finished. Provides the measurement time as a parameter.

### Performance.startMeasurement() 

Start the performance measurement

### Performance.stopMeasurement() 

Stops the performance measurement

## Tests

- Open spec/spec-runner.html in browser to see the test cases.

## License

MIT
define([], function () {
    return {
        _isStartCalledFirst: false,
        /** @enum */
        measurementUnit: {
            MILLISECOND: 0,
            SECOND: 1
        },
        options: {
            measurementUnit: 1,
            printMeasurementResult: true,
            decimalPlace: 2
        },
        displayString: "",
        startValue: null,
        endValue: null,
        /**
        * @param {Object} options - options object
        * @param {PerformanceMeter.measurementUnit} [options.measurementUnit=measurementUnit.SECOND] - Unit for the result string
        * @param {Boolean} [options.printMeasurementResult=true] - True if the measurement result shall be printed to console, false otherwise
        * @param {Number} [options.decimalPlace=2] - Amount of numbers after comma
        */
        configure: function (userOptions) {
            var options = this.options;
            userOptions = userOptions ? userOptions : {};
            options.measurementUnit = (userOptions.measurementUnit === this.measurementUnit.SECOND) ||
                (userOptions.measurementUnit === this.measurementUnit.MILLISECOND) ? userOptions.measurementUnit : options.measurementUnit;
            options.printMeasurementResult = typeof userOptions.printMeasurementResult === "boolean" ? userOptions.printMeasurementResult : options.printMeasurementResult;
            options.decimalPlace = typeof userOptions.decimalPlace === "number" ? userOptions.decimalPlace : options.decimalPlace;
        },
        /** */
        startMeasurement: function () {
            this.startValue = performance.now();
            this._isStartCalledFirst = true;
        },
        /**
         * @throws {Error} - If startMeasurement is not called before stopMeasurement
         */
        stopMeasurement: function () {
            var options = this.options, startValue = this.startValue, endValue = this.endValue, measurementUnit = this.measurementUnit,
                displayString = this.displayString;
            if (!this._isStartCalledFirst) {
                throw new Error("startMeasurement need to be called first");
            }
            endValue = performance.now();
            switch (options.measurementUnit) {
                case measurementUnit.MILLISECOND:
                    displayString = "Measured time: " + ((endValue - startValue)).toFixed(options.decimalPlace) + " milliseconds.";
                    break;
                case measurementUnit.SECOND:
                    displayString = "Measured time: " + ((endValue - startValue) / 1000).toFixed(options.decimalPlace) + " seconds.";
                    break;
            }
            if (options.printMeasurementResult) {
                console.log(displayString);
            }
            displayString = "";
            startValue = null;
            endValue = null;
            this._isStartCalledFirst = false;
        }
    };
});
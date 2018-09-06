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
            decimalPlace: 2,
            onMeasurementFinished: function () { }
        },
        displayString: "",
        startValue: null,
        endValue: null,
        /**
        * @param {Object} options - options object
        * @param {PerformanceMeter.measurementUnit} [options.measurementUnit=measurementUnit.SECOND] - Unit for the result string
        * @param {Boolean} [options.printMeasurementResult=true] - True if the measurement result shall be printed to console, false otherwise
        * @param {Number} [options.decimalPlace=2] - Amount of numbers after comma
        * @param {Function} options.onMeasurementFinished - Gets called, when the measurement is finished.
        *                                                   Provides the measurement time as a parameter
        */
        configure: function (userOptions) {
            var options = this.options;
            userOptions = userOptions ? userOptions : {};
            options.measurementUnit = (userOptions.measurementUnit === this.measurementUnit.SECOND) ||
                (userOptions.measurementUnit === this.measurementUnit.MILLISECOND) ? userOptions.measurementUnit : options.measurementUnit;
            options.printMeasurementResult = typeof userOptions.printMeasurementResult === "boolean" ? userOptions.printMeasurementResult : options.printMeasurementResult;
            options.decimalPlace = typeof userOptions.decimalPlace === "number" ? userOptions.decimalPlace : options.decimalPlace;
            options.onMeasurementFinished = typeof userOptions.onMeasurementFinished === "function" ? userOptions.onMeasurementFinished : function () { };
        },
        /** */
        startMeasurement: function () {
            this.startValue = performance.now();
            this._isStartCalledFirst = true;
            return this._isStartCalledFirst;
        },
        /**
         * @throws {Error} - If startMeasurement is not called before stopMeasurement
         */
        stopMeasurement: function () {
            var options = this.options, startValue = this.startValue, endValue = this.endValue, measurementUnit = this.measurementUnit,
                displayString = this.displayString, onMeasurementFinished = this.options.onMeasurementFinished, value;
            if (!this._isStartCalledFirst) {
                throw new Error("startMeasurement need to be called first");
            }
            endValue = performance.now();
            switch (options.measurementUnit) {
                case measurementUnit.MILLISECOND:
                    value = ((endValue - startValue)).toFixed(options.decimalPlace);
                    displayString = "Measured time: " + value + " milliseconds.";
                    break;
                case measurementUnit.SECOND:
                    value = ((endValue - startValue) / 1000).toFixed(options.decimalPlace);
                    displayString = "Measured time: " + value + " seconds.";
                    break;
            }
            if (options.printMeasurementResult) {
                console.log(displayString);
            }
            onMeasurementFinished(parseFloat(value));
            this.displayString = "";
            this.startValue = null;
            this.endValue = null;
            this._isStartCalledFirst = false;
            return true;
        }
    };
});
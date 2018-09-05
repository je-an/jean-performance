(function (root, factory) { 
 	 if (typeof define === 'function' && define.amd) { 
	 	 define([], factory); 
	} else if(typeof module === 'object' && module.exports) { 
		 module.exports = factory(); 
 	} else { 
	 	root.Performance = root.Performance || {}; 
	 	root.Performance = factory();
	}
}(this, function() {
var require, define;
(function (window) {
    var modules = { resolved: {}, unresolved: {} };
    function getResolvedModules(dependencies) {
        for (var i = 0, resolvedModules = []; i < dependencies.length; i++) {
            var resolvedModule = modules.resolved[dependencies[i]];
            if (resolvedModule) {
                resolvedModules.push(resolvedModule);
            }
        }
        return resolvedModules;
    }
    function checkUnresolved() {
        for (var id in modules.unresolved) {
            var module = modules.unresolved[id];
            var resolvedModules = getResolvedModules(module.dependencies);
            resolve(id, module.factory, module.dependencies, resolvedModules, false);
        }
    }
    function resolve(id, factory, dependencies, resolvedModules, saveUnresolved) {
        if (resolvedModules.length === dependencies.length) {
            modules.resolved[id] = factory.apply(factory, resolvedModules);
        } else if (saveUnresolved) {
            modules.unresolved[id] = {
                dependencies: dependencies,
                factory: factory
            }
        }
    }
    define = function (id, dependencies, factory) {
        if (modules.resolved[id]) {
            console.warn("There is already a module with id <" + id + "> defined. Therefore this module will be ignored");
            return;
        } else if ((typeof id !== "string") || (!Array.isArray(dependencies)) || (typeof factory !== "function")) {
            console.warn("Passed arguments for module are invalid");
            return;
        }
        if (dependencies.length === 0) {
            resolve(id, factory, dependencies, [], false);
        } else {
            resolve(id, factory, dependencies, getResolvedModules(dependencies), true);
        }
        checkUnresolved();
    };
    define.amd = {}; 
    require = function (dependencies, factory) {
        dependencies = Array.isArray(dependencies) ? dependencies : [dependencies];
        var resolvedModules = getResolvedModules(dependencies);
        if(resolvedModules.length === 1 && !factory){
            return resolvedModules[0];
        }
        if (resolvedModules.length === dependencies.length && factory) {
            factory.apply(factory, resolvedModules);
        } else {
            throw new Error("Not all modules are resolved");
        }
    };
})();
define("node_modules/jean-amd/dist/jean-amd", function(){});

define('src/Performance',[], function () {
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

 	 return require('src/Performance'); 
}));

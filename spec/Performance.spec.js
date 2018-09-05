// jscs:disable
// jshint ignore:start
define([
    "Performance"
], function (Performance) {
    describe('Performance.spec.js', function () {
        var instance;
        describe("Performance", function () {
            it("has enum measurementUnit with value for milliseconds", function () {
                expect(Performance.measurementUnit.MILLISECOND === 0).toBe(true);
            });
            it("has enum measurementUnit with value for seconds", function () {
                expect(Performance.measurementUnit.SECOND === 1).toBe(true);
            });
        });
        describe("Performance.configure", function () {
            it("uses default options if no user provided options are there", function () {
                Performance.configure();
                expect(Performance.options.measurementUnit === Performance.measurementUnit.SECOND).toBe(true);
                expect(Performance.options.printMeasurementResult).toEqual(true);
                expect(Performance.options.decimalPlace === 2).toBe(true);
                expect(typeof Performance.options.onMeasurementFinished === "function").toBe(true);
            });
            it("configures the performance measurement with user provided options", function () {
                Performance.configure({
                    measurementUnit: Performance.measurementUnit.MILLISECOND,
                    printMeasurementResult: false,
                    decimalPlace: 4,
                    onMeasurementFinished: function () { }
                });
                expect(Performance.options.measurementUnit === Performance.measurementUnit.MILLISECOND).toBe(true);
                expect(Performance.options.printMeasurementResult).toEqual(false);
                expect(Performance.options.decimalPlace === 4).toBe(true);
                expect(typeof Performance.options.onMeasurementFinished === "function").toBe(true);
            });
        });
        describe("Performance.startMeasurement", function () {
            it("starts the measurment", function () {
                expect(Performance.startMeasurement()).toBe(true);
                expect(typeof Performance.startValue === "number").toBe(true);
            });
        });
        describe("Performance.stopMeasurement", function () {
            beforeEach(function () {
                Performance._isStartCalledFirst = false;
            });
            it("throws error if start measurement is not called first", function () {
                try {
                    Performance.stopMeasurement();
                } catch (e) {
                    expect(e instanceof Error).toBe(true);
                }
            });
            it("stops the measurement", function () {
                Performance.startMeasurement();
                expect(Performance.stopMeasurement()).toBe(true);
            });
            it("calls the measurement finished callback", function () {
                Performance.configure({
                    onMeasurementFinished: function (value) {
                        expect(true === true).toBe(true);
                    }
                });
                Performance.startMeasurement();
                Performance.stopMeasurement();
            });
            it("passes the measurement value as a parameter to the callback", function () {
                Performance.configure({
                    onMeasurementFinished: function (value) {
                        expect(typeof value === "number").toBe(true);
                    }
                });
                Performance.startMeasurement();
                Performance.stopMeasurement();
            });
        });
    });
});


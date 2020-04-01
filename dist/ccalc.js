(function () {
    var defines = {};
    var entry = [null];
    function define(name, dependencies, factory) {
        defines[name] = { dependencies: dependencies, factory: factory };
        entry[0] = name;
    }
    define("require", ["exports"], function (exports) {
        Object.defineProperty(exports, "__cjsModule", { value: true });
        Object.defineProperty(exports, "default", { value: function (name) { return resolve(name); } });
    });
    var __spreadArrays = (this && this.__spreadArrays) || function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };
    define("index", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var DOM = /** @class */ (function () {
            function DOM() {
            }
            DOM.f = function (sel, context) {
                if (context === void 0) { context = document; }
                return context.querySelector(sel);
            };
            ;
            DOM.fall = function (sel, context) {
                if (context === void 0) { context = document; }
                return context.querySelectorAll(sel);
            };
            DOM.create = function (domString) {
                var __temporal = document.createElement("div");
                __temporal.innerHTML = domString;
                return __temporal.children.length == 1 ?
                    __temporal.children[0].cloneNode(true) :
                    (function (_) {
                        var elements = [];
                        for (var i = 0; i < __temporal.children.length; i++) {
                            elements.push(__temporal.children[i].cloneNode(true));
                        }
                        return elements;
                    })();
            };
            DOM.setAttr = function (el, attr, val) {
                el.setAttribute(attr, val);
                return el;
            };
            DOM.getAttr = function (el, attr) {
                return el.getAttribute(attr);
            };
            DOM.style = function (el, cssRules) {
                var styles = [];
                for (var rule in cssRules) {
                    styles.push(rule + ": " + cssRules[rule] + ";");
                }
                return DOM.setAttr(el, 'style', styles.join(''));
            };
            DOM.append = function (child, parent) {
                return parent.appendChild(child);
            };
            DOM.remove = function (child, parent) {
                return parent.removeChild(child);
            };
            return DOM;
        }());
        exports.dom = DOM;
        var Fns = /** @class */ (function () {
            function Fns() {
            }
            Fns.first = function (v) {
                return v[0];
            };
            Fns.second = function (v) {
                return v[1];
            };
            Fns.nth = function (n, v) {
                return v[n];
            };
            Fns.doTimes = function (n, fn) {
                if (n <= 0)
                    return;
                for (var i = 0; i < n; i++) {
                    fn(i);
                }
            };
            Fns.thread = function (v) {
                var fns = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    fns[_i - 1] = arguments[_i];
                }
                return fns.reduce(function (acc, curr) {
                    var fn = curr[0], args = curr.slice(1);
                    acc = fn.apply(void 0, __spreadArrays([acc], args));
                    return acc;
                }, v);
            };
            Fns.once = function (fn) {
                var called = false, __ret;
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (called) {
                        return __ret;
                    }
                    called = !called;
                    __ret = fn.apply(void 0, args);
                    return __ret;
                };
            };
            Fns.noOp = function () { };
            Fns.partition = function (coll, n) {
                var result = [];
                var partialResults = [];
                if (n <= 0 || coll.length == 0) {
                    return result;
                }
                if (n >= coll.length) {
                    return [coll];
                }
                for (var iterTimes = Math.ceil(coll.length / n), currIndex = 0, i = 0; i < iterTimes; i++) {
                    for (var j = 0; j < n && currIndex < coll.length; j++) {
                        partialResults.push(coll[currIndex++]);
                    }
                    result.push(partialResults);
                    partialResults = [];
                }
                return result;
            };
            return Fns;
        }());
        exports.u = Fns;
    });
    define("functions", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        function notANumber(v) {
            return /[^\d^\.]/.test(v);
        }
        function wrongFormatted(v) {
            var m = v.match(/\./g);
            return m !== null && m.length > 1 || v.endsWith(".");
        }
        function isZero(v) {
            return v.length == 1 && v == '0' || /^0\.0+$/.test(v);
        }
        function isNeg(v) {
            return v.startsWith('-');
        }
        function parseInput(v) {
            // If 'v' comes in the form of .123445 etc
            if (/^\.\d+/.test(v)) {
                return Number.parseFloat("0" + v);
            }
            return Number.parseFloat(v);
        }
        exports.parseInput = parseInput;
        function isValidNumber(v) {
            var input = v.trim();
            if (input.length == 0 || isZero(v) || isNeg(v) || notANumber(v) || wrongFormatted(v)) {
                return false;
            }
            return true;
        }
        exports.isValidNumber = isValidNumber;
        function alert(v) {
            window.alert(v);
        }
        exports.alert = alert;
        function inchesToFeet(v) {
            return v / 12;
        }
        exports.inchesToFeet = inchesToFeet;
        function cubicFeetToCubicYards(v) {
            return v / 27;
        }
        exports.cubicFeetToCubicYards = cubicFeetToCubicYards;
        function toNearestInteger(v, offset) {
        }
        exports.toNearestInteger = toNearestInteger;
    });
    define("calc", ["require", "exports", "index", "functions"], function (require, exports, index_1, functions_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var BagSizes;
        (function (BagSizes) {
            BagSizes[BagSizes["FortyPoundBag"] = 0.011] = "FortyPoundBag";
            BagSizes[BagSizes["SixtyPoundBag"] = 0.017] = "SixtyPoundBag";
            BagSizes[BagSizes["EightyPoundBag"] = 0.022] = "EightyPoundBag";
        })(BagSizes || (BagSizes = {}));
        /* Slab calculator selectors */
        var slabCalculatorParent = "#concrete-slab-calculator", slabThicknessInput = index_1.dom.f(slabCalculatorParent + " #slab-thickness"), slabWidthInput = index_1.dom.f(slabCalculatorParent + " #slab-width"), slabLengthInput = index_1.dom.f(slabCalculatorParent + " #slab-length"), slabQuantityInput = index_1.dom.f(slabCalculatorParent + " #slab-quantity"), slabSubmitBtn = index_1.dom.f(slabCalculatorParent + " #slab-calc-submit"), slabCalcResults = index_1.dom.f(slabCalculatorParent + " .result"), fortyPoundBagsSlab = index_1.dom.f(slabCalculatorParent + " .forty-pound-bags"), sixtyPoundBagsSlab = index_1.dom.f(slabCalculatorParent + " .sixty-pound-bags"), eightyPoundBagsSlab = index_1.dom.f(slabCalculatorParent + " .eighty-pound-bags");
        /* Footing calculator selectors */
        var footingCalculatorParent = "#concrete-footing-calculator", footingThicknessInput = index_1.dom.f(footingCalculatorParent + " #footing-thickness"), footingWidthInput = index_1.dom.f(footingCalculatorParent + " #footing-width"), footingLengthInput = index_1.dom.f(footingCalculatorParent + " #footing-length"), footingQuantityInput = index_1.dom.f(footingCalculatorParent + " #footing-quantity"), footingSubmitBtn = index_1.dom.f(footingCalculatorParent + " #footing-calc-submit"), footingCalcResults = index_1.dom.f(footingCalculatorParent + " .result"), fortyPoundBagsFooting = index_1.dom.f(footingCalculatorParent + " .forty-pound-bags"), sixtyPoundBagsFooting = index_1.dom.f(footingCalculatorParent + " .sixty-pound-bags"), eightyPoundBagsFooting = index_1.dom.f(footingCalculatorParent + " .eighty-pound-bags");
        /*  Column calculator selectors */
        var columnCalculatorParent = "#column-calculator", columnDiameterInput = index_1.dom.f(columnCalculatorParent + " #column-diameter"), columnHeightInput = index_1.dom.f(columnCalculatorParent + " #column-height"), columnQuantityInput = index_1.dom.f(columnCalculatorParent + " #column-quantity"), columnSubmitBtn = index_1.dom.f(columnCalculatorParent + " #column-calc-submit"), columnCalcResults = index_1.dom.f(columnCalculatorParent + " .result"), fortyPoundBagsColumn = index_1.dom.f(columnCalculatorParent + " .forty-pound-bags"), sixtyPoundBagsColumn = index_1.dom.f(columnCalculatorParent + " .sixty-pound-bags"), eightyPoundBagsColumn = index_1.dom.f(columnCalculatorParent + " .eighty-pound-bags");
        /* Steps calculator selectors */
        var stepCalculatorParent = "#steps-calculator", stepPlatformDepth = index_1.dom.f(stepCalculatorParent + " #platform-depth"), stepRiseHeight = index_1.dom.f(stepCalculatorParent + " #steps-height"), stepRunDepth = index_1.dom.f(stepCalculatorParent + " #steps-run"), stepWidth = index_1.dom.f(stepCalculatorParent + " #steps-width"), stepQuantity = index_1.dom.f(stepCalculatorParent + " #steps-quantity"), stepSubmitBtn = index_1.dom.f(stepCalculatorParent + " #steps-calc-submit"), stepCalcResults = index_1.dom.f(stepCalculatorParent + " .result"), fortyPoundBagsStep = index_1.dom.f(stepCalculatorParent + " .forty-pound-bags"), sixtyPoundBagsStep = index_1.dom.f(stepCalculatorParent + " .sixty-pound-bags"), eightyPoundBagsStep = index_1.dom.f(stepCalculatorParent + " .eighty-pound-bags");
        function sumFirstN(n) {
            return n * (n + 1) / 2;
        }
        function displayBagSizeResults(fortyContainer, sixtyContainer, eightyContainer, volume) {
            var _a = [BagSizes.FortyPoundBag, BagSizes.SixtyPoundBag, BagSizes.EightyPoundBag]
                .map(function (bag) { return Math.ceil(calculateBags(volume, bag)); }), f = _a[0], s = _a[1], e = _a[2];
            fortyContainer.textContent = "" + f;
            sixtyContainer.textContent = "" + s;
            eightyContainer.textContent = "" + e;
        }
        function calculateBags(v, bagSize) {
            switch (bagSize) {
                case BagSizes.FortyPoundBag: {
                    return v / BagSizes.FortyPoundBag;
                }
                case BagSizes.SixtyPoundBag: {
                    return v / BagSizes.SixtyPoundBag;
                }
                case BagSizes.EightyPoundBag: {
                    return v / BagSizes.EightyPoundBag;
                }
            }
        }
        function calculateSlab(thicknessInput, widthInput, lengthInput, resultsBox, quantity, type) {
            if (type === void 0) { type = 'slab'; }
            var thickness, width, length, results;
            var slabsQuantity;
            if (quantity.value == "") {
                slabsQuantity = 1;
            }
            else {
                if (functions_1.isValidNumber(quantity.value)) {
                    slabsQuantity = functions_1.parseInput(quantity.value);
                }
                else {
                    window.alert("Enter a valid " + type + " quantity");
                    return;
                }
            }
            if (functions_1.isValidNumber(thicknessInput.value)) {
                thickness = functions_1.parseInput(thicknessInput.value);
            }
            else {
                window.alert("Enter a valid value for " + type + " thickness.");
                return;
            }
            if (functions_1.isValidNumber(widthInput.value)) {
                width = functions_1.parseInput(widthInput.value);
            }
            else {
                window.alert("Enter a valid value for " + type + " width.");
                return;
            }
            if (functions_1.isValidNumber(lengthInput.value)) {
                length = functions_1.parseInput(lengthInput.value);
            }
            else {
                window.alert("Enter a valid value for " + type + " length.");
                return;
            }
            results = functions_1.cubicFeetToCubicYards(width * length * functions_1.inchesToFeet(thickness)) * slabsQuantity;
            resultsBox.textContent = results.toFixed(4);
            return results;
        }
        function calculateColumn(diameterInput, heightInput, resultsBox, quantity) {
            var radius, height, result;
            var columnsQuantity;
            var PI = Math.PI;
            if (quantity.value == "") {
                columnsQuantity = 1;
            }
            else {
                if (functions_1.isValidNumber(quantity.value)) {
                    columnsQuantity = functions_1.parseInput(quantity.value);
                }
                else {
                    functions_1.alert("Enter a valid value for quantity.");
                    return;
                }
            }
            if (functions_1.isValidNumber(diameterInput.value)) {
                radius = functions_1.inchesToFeet(functions_1.parseInput(diameterInput.value)) / 2;
            }
            else {
                functions_1.alert("Enter a valid value for column diameter.");
                return;
            }
            if (functions_1.isValidNumber(heightInput.value)) {
                height = functions_1.parseInput(heightInput.value);
            }
            else {
                functions_1.alert("Enter a valid value for columnn height");
                return;
            }
            result = functions_1.cubicFeetToCubicYards(PI * Math.pow(radius, 2) * height) * columnsQuantity;
            resultsBox.textContent = "" + result.toFixed(4);
            return result;
        }
        function calculateSteps(steps, height, width, platformDepth, runDepth, resultsBox) {
            // base case is where steps = 1
            var numberOfSteps, stepsHeight, stepsWidth, stepsPlatformDepth, stepsRunDepth;
            var calculation;
            if (functions_1.isValidNumber(steps.value)) {
                numberOfSteps = functions_1.parseInput(steps.value);
            }
            else {
                functions_1.alert("Enter a valid number of steps");
                return;
            }
            if (functions_1.isValidNumber(height.value)) {
                stepsHeight = functions_1.inchesToFeet(functions_1.parseInput(height.value));
            }
            else {
                functions_1.alert("Enter a valid value for height");
                return;
            }
            if (functions_1.isValidNumber(width.value)) {
                stepsWidth = functions_1.parseInput(width.value);
            }
            else {
                functions_1.alert("Enter a valid value for width");
                return;
            }
            if (functions_1.isValidNumber(platformDepth.value)) {
                stepsPlatformDepth = functions_1.inchesToFeet(functions_1.parseInput(platformDepth.value));
            }
            else {
                functions_1.alert("Enter a valid value for platform depth");
                return;
            }
            if (functions_1.isValidNumber(runDepth.value)) {
                stepsRunDepth = functions_1.inchesToFeet(functions_1.parseInput(runDepth.value));
            }
            else {
                functions_1.alert("Enter a valid value for run depth");
                return;
            }
            if (numberOfSteps == 1) {
                calculation = functions_1.cubicFeetToCubicYards(stepsHeight * stepsWidth * stepsPlatformDepth);
                resultsBox.textContent = "" + calculation.toFixed(4);
                return calculation;
            }
            calculation = (numberOfSteps * stepsHeight * stepsWidth * stepsPlatformDepth) +
                (stepsHeight * stepsWidth * stepsRunDepth * (sumFirstN(numberOfSteps - 1)));
            calculation = functions_1.cubicFeetToCubicYards(calculation);
            resultsBox.textContent = "" + calculation.toFixed(4);
            return calculation;
        }
        slabSubmitBtn.addEventListener('click', function (ev) {
            var cubicYards = calculateSlab(slabThicknessInput, slabWidthInput, slabLengthInput, slabCalcResults, slabQuantityInput);
            if (cubicYards == undefined)
                return;
            displayBagSizeResults(fortyPoundBagsSlab, sixtyPoundBagsSlab, eightyPoundBagsSlab, cubicYards);
        });
        footingSubmitBtn.addEventListener('click', function (ev) {
            var cubicYards = calculateSlab(footingThicknessInput, footingWidthInput, footingLengthInput, footingCalcResults, footingQuantityInput, 'footing');
            if (cubicYards == undefined)
                return;
            displayBagSizeResults(fortyPoundBagsFooting, sixtyPoundBagsFooting, eightyPoundBagsFooting, cubicYards);
        });
        columnSubmitBtn.addEventListener("click", function (ev) {
            var concreteCubicYards = calculateColumn(columnDiameterInput, columnHeightInput, columnCalcResults, columnQuantityInput);
            if (concreteCubicYards == undefined)
                return;
            displayBagSizeResults(fortyPoundBagsColumn, sixtyPoundBagsColumn, eightyPoundBagsColumn, concreteCubicYards);
        });
        stepSubmitBtn.addEventListener('click', function (ev) {
            var calcResults = calculateSteps(stepQuantity, stepRiseHeight, stepWidth, stepPlatformDepth, stepRunDepth, stepCalcResults);
            if (calcResults == undefined)
                return;
            displayBagSizeResults(fortyPoundBagsStep, sixtyPoundBagsStep, eightyPoundBagsStep, calcResults);
        });
    });
    
    'marker:resolver';

    function get_define(name) {
        if (defines[name]) {
            return defines[name];
        }
        else if (defines[name + '/index']) {
            return defines[name + '/index'];
        }
        else {
            var dependencies = ['exports'];
            var factory = function (exports) {
                try {
                    Object.defineProperty(exports, "__cjsModule", { value: true });
                    Object.defineProperty(exports, "default", { value: require(name) });
                }
                catch (_a) {
                    throw Error(['module "', name, '" not found.'].join(''));
                }
            };
            return { dependencies: dependencies, factory: factory };
        }
    }
    var instances = {};
    function resolve(name) {
        if (instances[name]) {
            return instances[name];
        }
        if (name === 'exports') {
            return {};
        }
        var define = get_define(name);
        instances[name] = {};
        var dependencies = define.dependencies.map(function (name) { return resolve(name); });
        define.factory.apply(define, dependencies);
        var exports = dependencies[define.dependencies.indexOf('exports')];
        instances[name] = (exports['__cjsModule']) ? exports.default : exports;
        return instances[name];
    }
    if (entry[0] !== null) {
        return resolve(entry[0]);
    }
})();
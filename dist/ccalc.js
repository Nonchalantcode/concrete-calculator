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
            return /\.+/.test(v);
        }
        function isZero(v) {
            return v.length == 1 && v == '0' || /^0\.0+$/.test(v);
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
            if (input.length == 0 || isZero(v) || notANumber(v) || wrongFormatted(v)) {
                return false;
            }
            return true;
        }
        exports.isValidNumber = isValidNumber;
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
        var slabCalculatorParent = "#concrete-slab-calculator", slabThicknessInput = index_1.dom.f(slabCalculatorParent + " #slab-thickness"), slabWidthInput = index_1.dom.f(slabCalculatorParent + " #slab-width"), slabLengthInput = index_1.dom.f(slabCalculatorParent + " #slab-length"), slabSubmitBtn = index_1.dom.f(slabCalculatorParent + " #slab-calc-submit"), slabCalcResults = index_1.dom.f(slabCalculatorParent + " .result"), fortyPoundBags = index_1.dom.f(slabCalculatorParent + " .forty-pound-bags"), sixtyPoundBags = index_1.dom.f(slabCalculatorParent + " .sixty-pound-bags"), eightyPoundBags = index_1.dom.f(slabCalculatorParent + " .eighty-pound-bags");
        function calculateSlab() {
            var thickness, width, length, results;
            if (functions_1.isValidNumber(slabThicknessInput.value)) {
                thickness = functions_1.parseInput(slabThicknessInput.value);
            }
            else {
                window.alert("Enter a valid value for slab thickness.");
                return;
            }
            if (functions_1.isValidNumber(slabWidthInput.value)) {
                width = functions_1.parseInput(slabWidthInput.value);
            }
            else {
                window.alert("Enter a valid value for slab width.");
                return;
            }
            if (functions_1.isValidNumber(slabLengthInput.value)) {
                length = functions_1.parseInput(slabLengthInput.value);
            }
            else {
                window.alert("Enter a valid value for slab length.");
                return;
            }
            // results in ft^3
            results = width * length * (thickness * (1 / 12));
            // results in yd^3
            results = results / 27;
            slabCalcResults.textContent = results.toFixed(4);
            return results;
        }
        function calculateSlabBags(v, bagSize) {
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
        slabSubmitBtn.addEventListener('click', function (ev) {
            var cubicYards = calculateSlab();
            if (cubicYards !== undefined) {
                fortyPoundBags.textContent = "" + Math.ceil(calculateSlabBags(cubicYards, BagSizes.FortyPoundBag));
                sixtyPoundBags.textContent = "" + Math.ceil(calculateSlabBags(cubicYards, BagSizes.SixtyPoundBag));
                eightyPoundBags.textContent = "" + Math.ceil(calculateSlabBags(cubicYards, BagSizes.EightyPoundBag));
            }
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
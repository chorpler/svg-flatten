"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SvgMod = void 0;
var parseFn = require('./parse.js');
var pathifyFn = require('./pathify.js');
var transformFn = require('./transform.js');
var flattenFn = require('./flatten.js');
var SvgMod = /** @class */ (function () {
    function SvgMod(source) {
        if (typeof source === "string") {
            this._value = parseFn(source);
        }
        else {
            this._value = source;
        }
    }
    SvgMod.prototype.parseInput = function (source) {
        if (!source) {
            throw new TypeError("SvgMod: Input type must be a string or parsed XmlDocument object");
        }
        if (typeof source === 'string') {
            this._value = parseFn(source);
        }
        else {
            this._value = source;
        }
    };
    return SvgMod;
}());
exports.SvgMod = SvgMod;
//# sourceMappingURL=svgmod.js.map
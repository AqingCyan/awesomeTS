"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
exports.router = express_1.Router();
exports.controller = function (target) {
    for (var key in target.prototype) {
        var path = Reflect.getMetadata('path', target.prototype, key);
        var handler = target.prototype[key];
        if (path) {
            exports.router.get(path, handler);
        }
    }
};
exports.get = function (path) {
    return function (target, key) {
        Reflect.defineMetadata('path', path, target, key);
    };
};

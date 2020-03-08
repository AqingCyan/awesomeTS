"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = function (target) {
    for (var key in target.prototype) {
        console.log(Reflect.getMetadata('path', target.prototype, key));
    }
};
exports.get = function (path) {
    return function (target, key) {
        Reflect.defineMetadata('path', path, target, key);
    };
};

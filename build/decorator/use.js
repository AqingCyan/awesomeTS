"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 中间件装饰器
require("reflect-metadata");
exports.use = function (middleware) {
    return function (target, key) {
        Reflect.defineMetadata('middleware', middleware, target, key);
    };
};

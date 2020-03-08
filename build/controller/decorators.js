"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
exports.router = express_1.Router();
var Method;
(function (Method) {
    Method["get"] = "get";
    Method["post"] = "post";
})(Method || (Method = {}));
exports.controller = function (target) {
    for (var key in target.prototype) {
        var path = Reflect.getMetadata('path', target.prototype, key);
        var method = Reflect.getMetadata('method', target.prototype, key);
        var handler = target.prototype[key];
        var middleware = Reflect.getMetadata('middleware', target.prototype, key);
        if (path && method && handler) {
            if (middleware) {
                exports.router[method](path, middleware, handler);
            }
            else {
                exports.router[method](path, handler);
            }
        }
    }
};
// 中间件装饰器
exports.use = function (middleware) {
    return function (target, key) {
        Reflect.defineMetadata('middleware', middleware, target, key);
    };
};
// 生成请求方法装饰器的工厂方法
var getRequestDecorator = function (type) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    };
};
exports.get = getRequestDecorator('get');
exports.post = getRequestDecorator('post');

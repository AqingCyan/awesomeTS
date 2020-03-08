"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Methods;
(function (Methods) {
    Methods["get"] = "get";
    Methods["post"] = "post";
    Methods["put"] = "put";
})(Methods || (Methods = {}));
// 生成请求方法装饰器的工厂方法
var getRequestDecorator = function (type) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    };
};
exports.get = getRequestDecorator(Methods.get);
exports.post = getRequestDecorator(Methods.post);

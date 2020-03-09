"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __importDefault(require("../router"));
/**
 * controller 的装饰器，可以设置 prefix 路径
 * @param root {String} prefix 路径
 */
exports.controller = function (root) { return (function (target) {
    for (var key in target.prototype) {
        var path = Reflect.getMetadata('path', target.prototype, key);
        var method = Reflect.getMetadata('method', target.prototype, key);
        var middleware = Reflect.getMetadata('middleware', target.prototype, key);
        var handler = target.prototype[key];
        if (path && method) {
            var fullPath = root === '/' ? path : "" + root + path;
            if (middleware) {
                router_1.default[method](fullPath, middleware, handler);
            }
            else {
                router_1.default[method](fullPath, handler);
            }
        }
    }
}); };
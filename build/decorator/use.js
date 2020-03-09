"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
/**
 * 中间件装饰器
 * @param middleware {RequestHandler} 中间件
 */
exports.use = function (middleware) { return (function (target, key) {
    // 取出原有的中间件队列，把传入的新中间件推入，再存入
    var originMiddleware = Reflect.getMetadata('middlewares', target, key) || [];
    originMiddleware.push(middleware);
    Reflect.defineMetadata('middlewares', originMiddleware, target, key);
}); };

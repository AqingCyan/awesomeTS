"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// 装饰器妙用
var userInfo = undefined;
function catchError(message) {
    return function (target, key, descriptor) {
        var fn = descriptor.value;
        descriptor.value = function () {
            try {
                fn();
            }
            catch (e) {
                console.log("UserInfo \u4E0D\u5B58\u5728 " + message + " \u5C5E\u6027");
            }
        };
    };
}
var Test = /** @class */ (function () {
    function Test() {
    }
    Test.prototype.getName = function () {
        return userInfo.name;
    };
    Test.prototype.getAge = function () {
        return userInfo.age;
    };
    __decorate([
        catchError('name'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Test.prototype, "getName", null);
    return Test;
}());
var test = new Test();
test.getName(); // undefined 没有 name 属性，但是被装饰器处理过，不会报错
// test.getAge() // undefined 没有 age 属性，会报错

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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var util_1 = require("../utils/util");
var CrollerController = /** @class */ (function () {
    function CrollerController() {
    }
    CrollerController.prototype.login = function (req, res) {
        var password = req.body.password;
        var isLogin = req.session ? req.session.login : false;
        if (isLogin) {
            res.json(util_1.getResponseData(false, '已经登录过啦'));
        }
        else {
            if (password === '123' && req.session) {
                req.session.login = true;
                res.json(util_1.getResponseData(true));
            }
            else {
                res.json(util_1.getResponseData(false, '密码不正确'));
            }
        }
    };
    __decorate([
        get('/login'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrollerController.prototype, "login", null);
    CrollerController = __decorate([
        controller
    ], CrollerController);
    return CrollerController;
}());

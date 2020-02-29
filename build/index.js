"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var router_1 = __importDefault(require("./router"));
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
// 自己定义.d.ts文件来进行类型融合，这也req上面就可以用teacherName的属性了
app.use(function (req, res, next) {
    req.teacherName = 'AqingCyan';
    next();
});
app.use(router_1.default);
app.listen(7001, function () {
    console.log('server is running');
});

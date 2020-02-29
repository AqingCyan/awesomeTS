"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var Analyzer = /** @class */ (function () {
    function Analyzer() {
    }
    // 单例模式改造
    Analyzer.getInstance = function () {
        if (!Analyzer.instance) {
            Analyzer.instance = new Analyzer();
        }
        return Analyzer.instance;
    };
    // 内容抽取
    Analyzer.getCourseInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var courseItems = $('.course-item');
        var courseInfos = [];
        courseItems.map(function (index, element) {
            var descs = $(element).find('.course-desc');
            var title = descs.eq(0).text();
            var count = parseInt(descs.eq(1).text().split('：')[1], 10);
            courseInfos.push({ title: title, count: count });
        });
        return {
            time: new Date().getTime(),
            data: courseInfos,
        };
    };
    // 数据处理成写入的格式
    Analyzer.generateJsonContent = function (result, filePath) {
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        fileContent[result.time] = result.data;
        return fileContent;
    };
    Analyzer.prototype.analyze = function (html, filePath) {
        var courseInfo = Analyzer.getCourseInfo(html);
        var fileContent = Analyzer.generateJsonContent(courseInfo, filePath);
        return JSON.stringify(fileContent);
    };
    return Analyzer;
}());
exports.default = Analyzer;

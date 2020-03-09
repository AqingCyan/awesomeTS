"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var CyanAnalyzer = /** @class */ (function () {
    // eslint-disable-next-line no-useless-constructor,no-empty-function
    function CyanAnalyzer() {
    }
    // 单例模式改造
    CyanAnalyzer.getInstance = function () {
        if (!CyanAnalyzer.instance) {
            CyanAnalyzer.instance = new CyanAnalyzer();
        }
        return CyanAnalyzer.instance;
    };
    // 内容抽取
    CyanAnalyzer.getCourseInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var courseItems = $('.course-item');
        var courseInfos = [];
        // eslint-disable-next-line array-callback-return
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
    CyanAnalyzer.generateJsonContent = function (result, filePath) {
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        fileContent[result.time] = result.data;
        return fileContent;
    };
    CyanAnalyzer.prototype.analyze = function (html, filePath) {
        var courseInfo = CyanAnalyzer.getCourseInfo(html);
        var fileContent = CyanAnalyzer.generateJsonContent(courseInfo, filePath);
        return JSON.stringify(fileContent);
    };
    return CyanAnalyzer;
}());
exports.default = CyanAnalyzer;

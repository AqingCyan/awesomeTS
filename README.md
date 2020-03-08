# awesomeTS

使用 TypeScript 编写一个爬虫项目

## 疑惑点
Q: controller里边使用use这个装饰器，而use这个装饰器却用了LoginController和CrowllerController做类型限制，这里的循环导入运行不会报错是为什么呢！

A: 类型的处理是 TS 底层帮你分析的，代码运行的时候，并不会包含类型这些东西


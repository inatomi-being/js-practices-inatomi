const modtest = require("inatomifbc");

console.log(inatomifbc.hello.hello());

// hello2.Heloクラス（hello2.js内）
var h = new modtest.helloworld.Hello("test");
console.log(h.hello());

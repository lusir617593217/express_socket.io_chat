// 引入 mongoose 模块
const mongoose = require("mongoose")

// 连接数据库
mongoose
  .connect("mongodb://localhost:27017/chat")
  .then(() => console.log("数据库连接成功！"))
  .catch((err) => console.log("数据库连接失败！", err))

// 暴露 连接

module.exports = mongoose
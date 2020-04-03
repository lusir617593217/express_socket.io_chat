// 引入 已连接数据库 文件
const mongoose = require("../connect")
// 引入 bcryptjs 加密模块
const bcryptjs = require('bcryptjs')

// 定义 schema
const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  avatar: {type: String, default: `${process.env.BASEURL}/assets/img/avatar.png`}
})

// 钩子函数，对密码加密
userSchema.pre('save', function(next){
  this.password = bcryptjs.hashSync(this.password, 10)

  next()
})

// 给 userModel 提供一个原型方法，用来 解密判断是否 密码相同
userSchema.methods.comparePassword = function(password) {
  return bcryptjs.compareSync(password, this.password)
}

// 生成 model
const UserModel = mongoose.model('user', userSchema)

// 暴露 model
module.exports = UserModel

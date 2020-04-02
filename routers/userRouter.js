// 引入 express 模块
const express = require('express')
// 引入 userModel 自己定义的数据库user集合模型
const userModel = require('../db/modules/userModel')

// 创建路由
const router = express.Router()

// 登录接口 users/login
router.post("/login", async (req, res) => {
  // res.send("登录成功！")
  const {username, password} = req.body
  let user = await userModel.findOne({username})
  if( !user ) { // 如果用户不存在，就直接注册
    user = await userModel.create({username, password})
  }
  // 验证密码是否正确
  if(user.comparePassword(password)){  // 模型原型的绑定的方法，用来验证密码 登录成功
    // 给 req.session 添加一个自定义属性，用来保存用户信息
    req.session.info = {
      userId: user._id,
      username: user.username
    }
    res.redirect(req.session.redirect || '/chatroom')
  }else{
    throw new Error("用户名或密码不正确！")
  }
})


// 暴露路由
module.exports = router
//  引入 express 模块
const express = require('express')
// 引入 判断是否已经登录文件
const isLogin = require('../middlewares/isLogin')

// 创建路由对象
const router = express.Router()

// 处理 路由接口
router.get("/", (req, res) => {
  res.render("welcome")
})

router.get("/chatroom", isLogin, (req, res) => {
  req.session.path = req.query
  res.render("chatroom", {username: req.session.info.username})
})

router.get("/login", (req, res) => {
  res.render("login")
})

router.get("/register", (req, res) => {
  res.render("register")
})

// 暴露 路由
module.exports = router
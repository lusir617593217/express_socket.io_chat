// 引入 express 模块
const express = require('express')
// 引入 dotenv,并配置
require('dotenv').config()
// 引入 express-async-errors 模块
require('express-async-errors')
// 引入 express-session 
const session = require('express-session')
// 引入 socket.io 模块
const socketIo = require('socket.io')

// 创建服务
const app = express()

// 静态资源托管
app.use(express.static('./public'))

// 处理 ejs模板设置
app.set("view engine", 'ejs')
app.set("views", "./views")

// 处理 req.body 传递的数据
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 使用 express-session
app.use(session({
  // 秘钥
  secret: "lzf-1920",
  // 是否每次有请求的时候都去更新有效时间
  resave: false,
  // 是否初始化时就设置一次
  saveUninitialized: true
}))


// 使用路由
app.use("/", require('./routers/indexRouter'))
app.use("/users", require('./routers/userRouter'))


// 统一处理 async/await 的 catch 错误
app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send(err.message)
})

// 监听端口
const server = app.listen(3000, () => {
  console.log("3000 端口正在被监听哦！！！")
})

// 使用 socketIo 监听服务
const io = socketIo.listen(server)

// 监听用户连接
io.on('connect', socket => {
  // 监听用户传递来的用户名，并保存在每个用户自定义属性上
  socket.on('setName', username => {
    socket.username = username

    // 给其他用户广播 一条系统信息信息
    socket.broadcast.emit('message', {
      username: 'System',
      message: `欢迎${socket.username}加入来聊天室！`
    })
  })

  // 监听用户发来的消息
  socket.on('userMessage', data => {
    // 转发给其他用户
    socket.broadcast.emit('message', {
      username: socket.username,
      message: data.message
    })
    // 同时给自己也发一份
    socket.emit('message', {
      username: socket.username,
      message: data.message
    })
  })
})
module.exports = (req, res, next) => {
  // 把 请求地址保存起来
  req.session.redirect = req.url
  // 验证是否登录
  if(req.session.info) {  // 自定义的属性存在，说明已经登录了
    next()
  }else{
    res.redirect('/login')  // 没有登录就跳转到登录页
  }
}
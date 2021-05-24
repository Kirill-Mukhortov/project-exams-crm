const isUser = (req, res, next) => {
  if(req.session?.user?.role === 'Экзаменатор'){
    res.locals.isUser = true
  }
  next()
}

module.exports = { isUser }

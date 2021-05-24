const isAdmin = (req, res, next) => {
  if(req.session?.user?.role === 'Администратор'){
    res.locals.isAdmin = true
  }
  next()
}

module.exports = { isAdmin }

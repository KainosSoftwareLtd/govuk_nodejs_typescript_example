import * as express from 'express'

export function attachErrorHandling (app: express.Application) {
  app.use(function(req, res, next) {
    let err = new Error('Not Found')
    err['status'] = 404
    next(err)
  })

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
  })
}

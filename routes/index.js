var express = require('express');
var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.get('/login', function(req, res, next) {
//   res.render('login', { title: 'Login Page' });
// });

// module.exports = router;

module.exports = function (passport) {
  // console.log('passport', passport.authenticate)
  // console.log('passport', passport);
  router.get('/', authenticated('/login'), function (req, res, next) {
    res.render('index', { title: 'Express' });
  })
  // router.post('/login', passport.authenticate('login', {
  //   successRedirect: '/',
  //   failureRedirect: '/login',
  //   failureFlash: true
  // }));
  router.post('/login', (req,res,next)=>{
    console.log('body', req.body);
    passport.authenticate('login', (err, user, info) => {
      console.log('loign', err, user, info);
      if(info) {return res.json(info)}
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
      req.login(user, (err) => {
        console.log('after login', user,err)
        if (err) { return next(err); }
        // return res.redirect('/');
        return res.json({});
      })
    })(req, res, next);
  });
  router.get('/login', function (req, res, next) {
    res.render('login', { title: 'Login Page' });
  });

  function authenticated (path) {
    // console.log('authenticated_1')
    // if (req.isAuthenticated()) {
    //   console.log('authenticated_2')
    //   return next();
    // }
    // console.log('authenticated_3')
    // return res.redirect('/login');
    return function(req, res, next) {
      if(req.isAuthenticated()) {
          next();
      } else {
          res.redirect(path);
      }
    };
  }

  router.get('/logout', function (req,res) {
    req.logout()
    res.redirect('/')
  })

  return router;
}

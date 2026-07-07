const express = require('express');
const router = express.Router();
const passport = require("passport");

router.get('/', function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  res.render("signin", {
    title: "Sign in",
    isAuth: isAuth,
    errorMessage: req.flash("error"),
  });
});

router.post('/', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      req.flash("error", info && info.message ? info.message : "Invalid User");
      return res.redirect('/signin');
    }

    req.logIn(user, function (loginErr) {
      if (loginErr) {
        return next(loginErr);
      }

      req.session.userid = user.id;
      return res.redirect('/');
    });
  })(req, res, next);
});

module.exports = router;
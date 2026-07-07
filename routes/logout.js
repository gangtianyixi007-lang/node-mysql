const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    req.session.userid = null;
    req.session.destroy(function (sessionErr) {
      if (sessionErr) {
        return next(sessionErr);
      }

      res.redirect('/');
    });
  });
});

module.exports = router;
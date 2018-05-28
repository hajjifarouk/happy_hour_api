const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/user.controller');
const passportLocalSignIn = passport.authenticate('local', { session: false });
const passportGoogleSignIn = passport.authenticate('googleToken', { session: false });
const passportFacebookSignIn = passport.authenticate('facebookToken', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/signup')
    .post(validateBody(schemas.signupSchema), UsersController.signUp);
router.route('/signin')
    .post(validateBody(schemas.signinSchema), passportLocalSignIn, UsersController.signIn);
router.route('/oauth/google')
    .post(passportGoogleSignIn, UsersController.googleOAuth);
router.route('/oauth/facebook')
    .post(passportFacebookSignIn, UsersController.facebookOAuth);
router.route('/secret')
    .get(passportJWT, UsersController.secret);

module.exports = router;
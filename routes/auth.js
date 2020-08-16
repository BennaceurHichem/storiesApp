const express = require('express')
const router  =  express.Router()
const passport = require('passport')


        /*
            @description Aithenticated with google auth
            @route /auth/google 
        */
router.get('/google',
       passport.authenticate('google', { scope: ['profile'] })
       
       )
      


        /*
            @description Aithenticated with google auth
            @route /auth/google /callback
        */
router.get('/google/callback', 
       passport.authenticate('google', { failureRedirect: '/' }),
        (req, res)=> {
         // Successful authentication, redirect home.
         res.redirect('/dashboard');
       });



module.exports = router
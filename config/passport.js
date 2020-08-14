//GOOGLE AUTH 
//IN THIS FILE , we will add a new user after authen google auth     
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')
const User =  require('../Models/User')



//this passport is passed from the index.js 
module.exports = function(passport){

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3001/auth/google/callback"
      },
      async (accessToken, refreshToken, profile, done)=> {


        //SUCCESFULL LOGIN 
        console.log(profile)
             //googleId eist in User Modle 
                await  User.findOrCreate({ googleId: profile.id }, function (err, user) {
                    done(null,user);
                    return cb(err, user);
                    });
                }
                

                
    ));


    passport.serializeUser( (user, done)=> {
        //serialize only the user.is
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done)=> {
        User.findById(id, (err, user)=> {
          done(err, user);
        });
      });
    

}
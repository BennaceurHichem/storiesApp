const express = require('express')
const router  =  express.Router({ mergeParams: true })

 const Story =  require("../Models/Story")   
const {ensureAuth,ensureGuest} = require('../middleware/auth')

router.get('/',ensureGuest, (req,res)=>  {

            res.render('login',{
                layout:'login'
            })



    })



router.get('/dashboard',ensureAuth, async (req,res)=>  {
    try{
        //find all users story with their specific id 
        const stories  =  await Story.find({user:req.user.id}).lean()

        console.log("stories"+stories)
                    /*The lean option tells Mongoose to skip hydrating the result documents.
             This makes queries faster and less memory intensive,
             but the result documents are plain old JavaScript objects (POJOs)
            */

        res.render('dashboard',{
            //adding these attributes mean that they are accessile in the vie file 
            name:req.user.displayName,
            stories: stories,
        })
    }catch(err) {

        console.log("ERROR "+err)
        res.render('error/500')
    }



       



    })



module.exports = router
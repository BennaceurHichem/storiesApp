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
        const stories  =  await Story.find({use:req.user.id}).lean()

        res.render('dashboard',{
            //adding these attributes mean that they are accessile in the vie file 
            name:req.user.displayName,
            layout:'main'
        })
    }catch(err) {

        console.log("ERROR "+err)
        res.render('error/500')
    }



       



    })



module.exports = router
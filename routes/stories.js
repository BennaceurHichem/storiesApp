const express = require('express')
const router  =  express.Router({ mergeParams: true })

const Story = require('../Models/Story')
const {ensureAuth,ensureGuest} = require('../middleware/auth')

router.get('/add',ensureAuth, async (req,res)=>  {


        res.render('stories/add')

    })

router.post('/',ensureAuth,async  (req,res)=>  {
        try{

            req.body.user = req.user.id
            await Story.create(req.body)
            res.redirect('dashboard')
        
        }catch(err){
        console.log("error when getting stories"+err)
        res.render('error/500')
        }





})

module.exports = router
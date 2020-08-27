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
//@desc Show All stories 
//@route GET /stories/Add
 

router.get('/',ensureAuth, async (req,res)=>  {

        try{
        /*fetch then render stories 
            - populate usr mean that the data of the  specific user in story is get also and accessible 
            with story.user.  */
           const stories =  await Story.find({status:'public'})
            .populate('user')
            .sort({createdAt:'desc'})
            .lean()
                res.render('stories/index',{
                    stories,

                })


        }catch(err){
            console.log(err)
            res.render('error/500')
        }

    })
module.exports = router
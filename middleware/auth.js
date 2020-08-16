module.exports = auth=>{


    ensureGuest:(req,res,next)=>{
        if(req.isAuthenticated()) res.next()
        else res.redirect('/')


    },  
    ensureAuth:(req,res,next)=>{

            if(req.isAuthenticated())  res.redirect('/dashboard')
            else return next()

    }



}
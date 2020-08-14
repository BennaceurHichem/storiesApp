const mongoose = require('mongoose')


const UserSchema  =  new mongoose.Schema({

    googleId: {
        type: String,
        required: true
      },
      displayName: {
        type: String,
        required: true
      },

    firstName: {
        type: String,
        
      },

      lastName: {
        type: String,
       
      },
      image:  {
          type:String,
          require:true 
      },
      createdAt: {
          type:Date,
          value:Date.now
      }



})






// Export the User model
module.exports = mongoose.model('User', UserSchema);
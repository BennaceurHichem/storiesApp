const mongoose = require('mongoose')


cosnt UserSchema  =  new mongoose.Schema({

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
          type:String;
          require:true 
      },
      createdAt: {
          type:Date,
          value:Date.now
      }



})





mongoose.model('User', UserSchema);
// Export the User model
module.exports = User   ;
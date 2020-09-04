const mongoose = require('mongoose')


const StorySchema  =  new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim:true
      },
      body: {
        type: String,
       },

    status: {
        type: String,
        default:"public" ,
        enum:["public","private"]
        
      },

      //this is how we make a story related to a specific user 
      user: {
        type: mongoose.Schema.Types.ObjectId,
        //name of the Model
        ref:"User"
       
      },

      createdAt: {
          type:Date,
          default: Date.now,
        }



})






// Export the User model
module.exports = mongoose.model('Story', StorySchema);
//this is the connection file with mongo db

const mongoose  = require('mongoose')


const dbConnection = async ()=>{

try{

        const conn= await mongoose.connect(process.env.MONGO_URI,
            { 
                useNewUrlParser: true,
                useUnifiedTopology:true,
                useFindAndModify:false
            
            })
            //you can get all connection data from this conn variable 
            console.log(`succesfull db connection in ${conn.connection.port}`)
            

           }
            catch(err)
            {


                console.log("error"+err)
                process.exit(1)


            }

}


module.exports = dbConnection
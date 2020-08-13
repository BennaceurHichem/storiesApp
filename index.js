const express  =  require('express')
const morgan  =  require('morgan')
const dotenv  =  require('dotenv')
const exphbs = require('express-handlebars')

//Load config formt he specific file config.env,
// result will eb acdessible from process.env
dotenv.config({ path: './config/config.env' })
const app = express()

if(process.env.NODE_ENV==="development")
 {
     app.use(morgan('dev'))
 }

//configure express-handlebars to use views in our folder with .hbs extension
 app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

const dbConnection  = require('./config/db')



dbConnection()



const PORT = process.env.PORT || 5000



app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT} in ${process.env.NODE_ENV} mode `)
  })
const express  =  require('express')
const morgan  =  require('morgan')
const dotenv  =  require('dotenv')
const exphbs = require('express-handlebars')
const mongoose =require('mongoose')

const path = require('path')

const passport = require('passport')

//session despnednecies
const session  =  require('express-session')
//make sure that this is below session decalaration 
const MongoStore = require('connect-mongo')(session)


const methodOverride = require('method-override')



//Load config formt he specific file config.env,
// result will eb acdessible from process.env
dotenv.config({ path: './config/config.env' })
const app = express()


// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
//method ovveride to use put and delete in forms 
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))



if(process.env.NODE_ENV==="development")
 {
     app.use(morgan('dev'))
 }



//PASSSPORT CONFIG 
require('./config/passport')(passport)

//express ession middeware 
//session config(should be above the use of passport.session) 
app.use(session({
  secret: 'keyboard cat',
  //resave: false, we don't want to save a session if n oting is modified 
  resave: false,
  saveUninitialized: false,
  //in this field we add ,
  store: new MongoStore({ mongooseConnection: mongoose.connection })

}))




app.use(passport.initialize())
app.use(passport.session())

//set global variable with res.locals 
app.use(function(req,res,next){
  //this gives us the possibility of accessing to the user variable from our templates 
  res.locals.user = req.user || null 
  next()
})


 app.use(express.static(path.join(__dirname,'public')))


//handlebar helper 
const {formatDate,stripTags,editIcon,select,truncate} = require('./helpers/hbs')



//configure express-handlebars to use views in our folder with .hbs extension
 app.engine('.hbs', exphbs({
  helpers:{
    formatDate,
    select,
    editIcon,
    stripTags,
    truncate,
  },  
   defaultLayout:'main',
    extname: '.hbs',
   
}));
app.set('view engine', '.hbs');

//configure routers 
  app.use('/', require('./routes/index.js'));
  app.use('/auth', require('./routes/auth.js'));
  app.use('/stories', require('./routes/stories.js'));


 

const dbConnection  = require('./config/db')



dbConnection()






const PORT = process.env.PORT || 5000



app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT} in ${process.env.NODE_ENV} mode `)
  })
const express = require('express');
const path = require('path');
const exphbs= require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
//Initializations
const app = express();
require('./database');

//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));//Extiende verbos http en forms
app.use(session({
    secret:'mysecretapp',//una palabra cualquiera para codificación
    resave:true,
    saveUninitialized:true
}));
app.use(flash());
//Global variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    //next() hace que se ejecute el siguiente codigo sin esperar la ejecución del bloque
    next();
});
//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));
//Static Files
app.use(express.static(path.join(__dirname,'public')));
//Server is listening

app.listen(app.get('port'),function()
{
    console.log("Server on port http://localhost:"+app.get('port'));
});
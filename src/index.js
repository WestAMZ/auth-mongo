const express = require('express');
const path = require('path');
const exphbs= require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

//Initializations
const app = express();
require('./database');
require('./config/passport');

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

//Segmento de Passport (debe ir luego de establecer el uso de sesiones)
app.use(passport.initialize());
app.use(passport.session());

//Configuración de Flash (mensajes globales)
app.use(flash());
//Global variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    //Objeto guardado por passport req.user
    res.locals.user = req.user || null;
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
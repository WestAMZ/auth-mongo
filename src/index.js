const express = require('express');
const app = express();

//Settings
app.set('port', process.env.PORT || 3000)
//Middlewares

//Global variables

//Routes

//Static Files

//Server is listening

app.listen(app.get('port'),function()
{
    console.log("Server on port https://localhost:"+app.get('port'));
});
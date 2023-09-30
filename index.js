const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const passport_local = require('./Confige/passport')
const path = require('path');
const port = 8000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('Assets'))
app.use('/uploads',express.static('uploads'))

app.use(session({
    name:'urmit',
    secret:'codeadmin',
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:10000*60*60
    }
}));
app.use(passport.initialize());
app.use(passport.session())
app.use(passport.datashow)

const db = require('./Confige/mongoose');

// const mongoose = require('mongoose')

// const url = 'mongodb+srv://urmitkraiyani:Urmit6968@cluster0.qih6ye4.mongodb.net/EcomerceProject?retryWrites=true&w=majority';

// const connectionParams = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }
// mongoose.connect(url, connectionParams)
//     .then(() => {
//         console.log('Connected to database ')
//     })
//     .catch((err) => {
//         console.error(`Error connecting to the database. \n${err}`);
//     })

app.use('/', require('./Routes/Adminroutes/Admin'));
app.use('/User',require('./Routes/UserRoutes/User'))

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    return console.log('port is run', port)
})
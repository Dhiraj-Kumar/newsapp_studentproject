const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/UserRoute');
const cookieSession = require("cookie-session");
const passport = require('passport')
require('./auth/authenticator')
const bodyParser = require('body-parser');
const session = require('express-session')
let port =process.env.PORT || 8000

var cors = require('cors')
var cookieParser=require('cookie-parser')
const app = express();
app.use(session({secret:'cats'}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())


const URI = process.env.MONGODB_SERVER || 'mongodb://localhost:27017/UsersDB';


mongoose.connect(URI);
mongoose.connection.once('open', (err) => {
    if (!err) {
        console.log('Connected to database');
    }
});

app.use(bodyParser.json());
app.use(cors({
    origin: true, 
    credentials: true, 
}
))


app.use('/api/v1', routes);


let server =app.listen(port, () => {
    console.log('Server is running at port 8000');
});

module.exports =server
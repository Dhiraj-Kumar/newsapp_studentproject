const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/ReferRoute');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8002;

var cors = require('cors')
const app = express();

app.use(bodyParser.json());
app.use(cors())


app.use('/api/v3', routes);

const URI = process.env.MONGODB_SERVER ||'mongodb://localhost:27017/RefersDB' ;


mongoose.connect(URI);
mongoose.connection.once('open', (err) => {
    if (!err) {
        console.log('Connected to database');
    }
});

const server = app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});



module.exports =server
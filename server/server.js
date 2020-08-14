require('./assets/config/config');
require('./assets/models/db');
require('./assets/config/passportConfig');

const express    = require('express');
const bodyParser = require('body-parser');
const passport   = require('passport');
const cors       = require('cors');
const rtsIndex   = require('./assets/routes/index.router');

const app        = express();

// MIDDLEWARE
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());
app.use('/api', rtsIndex);

// ERROR HANDLER
app.use((err, req, res, next) => {
    if(err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
})


// START SERVER
app.listen(process.env.PORT, () => console.log(`Your listening to PORT: ${process.env.PORT}`));
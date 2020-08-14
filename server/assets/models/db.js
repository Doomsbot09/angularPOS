const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, (err) => {
    if(!err){
        console.log("DB connection successfully");
    } else {
        console.log(`Failed to connect ${JSON.stringify(err), undefined, 2}`);
    }
});

require('./products.model');
require('./category.model');
require('./item.model');
require('./user.model');
require('./sales.model');
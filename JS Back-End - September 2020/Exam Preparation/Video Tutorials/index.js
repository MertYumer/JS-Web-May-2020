const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

const connectionString = config.connectionString;
const mongoose = require('mongoose');

const app = require('express')();

require('./config/express')(app);
require('./config/routes')(app);

mongoose.connect(connectionString, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (err) {
        console.error(err);
        throw err;
    }
}).then(() => {
    app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
});



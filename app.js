var settings = require('./config/settings');
(function () {
    'use strict';
    var express = require('express'),
        app = express();
    require('./config/config_app')(app);
    require('./config/config_models')();
    require('./config/config_routes')(app);

    console.log('Starting the server');
    console.log('-------------------------');
    console.log('URL:' + settings.values.config.server);
    console.log('Port:' + settings.values.config.port);
    app.listen(settings.values.config.port);
    console.log('Started the server');
    process.on('uncaughtException', function (error) {
        console.log(error.stack);
        console.log(error);
    });
})();
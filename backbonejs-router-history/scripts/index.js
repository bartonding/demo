define(function (require, exports, module) {
    console.log('page start...');
    var test = require('../templates/test.html');
    $('h1').append(test);
    // console.log(test);

    var app = require('./my-router');


    app.on('route:help', function () {
        console.log('app.on route:help ...');
    });

    app.on('route:search', function () {
        console.log('app.on route:search ... ', arguments);
    });


    Backbone.history.start({
        pushState: false
        ,hashChange: true
        // ,root: '/git/demo/backbonejs-router-history/'
    });

    // -------------------------------------------------------------------------
    $('#help').on('click', function (evt) {
        app.navigate("help", {trigger: true, replace: false});
    });

    $('#search1').on('click', function (evt) {
        app.navigate("search/barton", {trigger: true, replace: false});
    });

    $('#search2').on('click', function (evt) {
        app.navigate("search/barton/p123", {trigger: true, replace: false});
    });
});
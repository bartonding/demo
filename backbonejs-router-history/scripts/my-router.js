define(function (require, exports, module) {

    var Workspace = Backbone.Router.extend({

        // 对外部注册的路由事件无效
        execute: function(callback, args) {
            // args.push(parseQueryString(args.pop()));
            // console.log('------------------');
            // console.log(callback.toString(), args);

            if (callback) callback.apply(this, args);
        },

        routes: {
            "help":                 "help",    // #help
            "search/:query":        "search",  // #search/kiwis
            "search/:query/p:page": "search"   // #search/kiwis/p7
        },

        help: function() {
            console.log('Router.help');
        },

        search: function(query, page) {
            console.log('Router.search : query = ', query, ', page = ', page);
        }

    });

    return new Workspace;
});
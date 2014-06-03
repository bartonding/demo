define(function (require, exports, module) {
    console.log('page start...');
    // -------------------------------------------------------------------------
    var Router = Backbone.Router.extend({
        routes: {
            "r/:tab/:nav/:page": "redirect"
        },
        _status: {},
        set: function (key, val) { this._status[key] = val; return this;},
        get: function (key, defVal) { return this._status[key] || defVal},
        initialize: function () {
            this.on('tabChange', _.bind(this.tabChange, this));
            this.on('pageChange', _.bind(this.pageChange, this));
        },
        getkey: function (tab, nav) {
            tab || (tab = this.get('tab'));
            nav || (nav = this.get('nav'));
            return tab + '_' + nav;
        },
        tabChange: function (tab, nav, navId, contentId) {
            this.set('tab', tab).set('nav', nav)
                .set('navId', navId).set('contentId', contentId);
            var key = this.getkey();
            this.set('page', this.get(key) || 1);
            this._navigate();
        },
        pageChange: function (page) {
            this.set('page', page).set(this.getkey(), page);
            this._navigate();
        },
        _navigate: function () {
            var tab  = this.get('tab');
            var nav  = this.get('nav');
            var page = this.get('page');
            this.navigate([tab, nav, page].join('/'), {trigger: true});
        },
        redirect: function (tab, nav, page) {
            page = page - 0;
            if (_.isEmpty(this._status)) {
                this.set('tab', tab).set('nav', nav).set('page', page)
                    .set(this.getkey(), page);
            }
            console.log('router redirect to ... ', arguments);
            if (this.views) {
                var view = this.views[this.getkey()];
                view.render();
            }
        },
        mountViews: function (views) {
            this.views = views;
        }
    });
    var router = window.router = new Router();
    // -------------------------------------------------------------------------
    var tabs = require('./jnx-tabs');
    tabs.set('router', router);

    var View1 = require('./view1');


    var ds1 = require('./data-source-1');
    var view1 = new View1();
    var View1Item = require('./view1-item');
    var Paging = require('./paging');

    var nav2Init = _.once(function (ctid) {
        console.log('nav2 init ......');
        var content = $('#' + ctid);
        content.empty().append(view1.render().$el);
        view1.setPaging(new Paging(router));
    });
    // tabs.on('tabChange', function (tabName, navName, navId, contentId) {
    //     console.log('tab change: ', arguments);
    // });
    tabs.on('outer:nav2', function (tabName, navName, navId, contentId) {
        console.log('outer:nav2', arguments);
        nav2Init(contentId);
        ds1.getData('query obj', function (json) {
            view1.renderPaging(json.total, 1);
            view1.renderList(json.items, View1Item);
        });
    });

    // -------------------------------------------------------------------------
    var hasHash = Backbone.history.start({
        pushState: false, hashChange: true
    });
    // console.log('>>>>> has hash in current url : ', hasHash);
    // 默认展开的 tab
    if(!hasHash) router.navigate('r/outer/nav2/1', {trigger: true});
});



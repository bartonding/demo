define(function (require, exports, module) {
    console.log('page start...');

    var View1 = require('./view1');

    var router = require('./my-router');
    var tabs = require('./jnx-tabs');
    tabs.set('router', router);

    // tabs.on('tabChange', function (tabName, navName, navId, contentId) {
    //     console.log('tab change: ', arguments);
    // });

    // -------------------------------------------------------------------------
    var ds = require('./data');
    var view1 = new View1();
    var View1Item = require('./view1-item');
    var Paging = require('./paging');

    var nav2Init = _.once(function (ctid) {
        console.log('nav2 init ......');
        var content = $('#' + ctid);
        content.empty().append(view1.render().$el);
        view1.setPaging(new Paging());
    });
    tabs.on('outer:nav2', function (tabName, navName, navId, contentId) {
        console.log('outer:nav2', arguments);
        nav2Init(contentId);
        ds.getData('query obj', function (json) {
            view1.renderPaging(600, 4);
            view1.renderList(json.items, View1Item);
        });
    });

    // -------------------------------------------------------------------------
    var hasHash = Backbone.history.start({
        pushState: false, hashChange: true
    });
    // console.log('>>>>> has hash in current url : ', hasHash);
    // 默认展开的 tab
    if(!hasHash) router.navigate('tabs/outer/nav2', {trigger: true});
});



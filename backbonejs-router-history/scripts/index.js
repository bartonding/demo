define(function (require, exports, module) {
    console.log('page start...');

    var router = require('./my-router');
    var tabs = require('./jnx-tabs');
    tabs.set('router', router);

    tabs.on('tabChange', function (tabName, navName, navId, contentId) {
        console.log('tab change: ', arguments);
    });

    // tabs.on('outer:nav2', function (tabName, navName, navId, contentId) {
    //     console.log('outer:nav2', arguments);
    // });

    var hasHash = Backbone.history.start({
        pushState: false, hashChange: true
    });
    // console.log('>>>>> has hash in current url : ', hasHash);
    // 默认展开的 tab
    if(!hasHash) router.navigate('tabs/outer/nav2', {trigger: true});
});
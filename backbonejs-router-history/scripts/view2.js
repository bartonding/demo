define(function (require, exports, module) {

    var template = require('../templates/view2.html');
    var View = require('./view');
    var View2Item = require('./view2-item');
    var ds1 = require('./data-source-1');

    var View2 = View.extend({

        // 本 view 的名称，可以理解为 first name 和 last name
        // first name : <div tab-wraper data-name="{first_name}">
        // last  name : <div tab-nav data-name="{last_name}">
        iname: ['outer', 'nav2'],

        template: _.template(template),

        ds: ds1,

        ViewItem: View2Item,

        events: {}

    });

    return View2;
});
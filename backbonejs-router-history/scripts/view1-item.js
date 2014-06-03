define(function (require, exports, module) {

    var template = require('../templates/view1-item.html');

    var View1Item = Backbone.View.extend({

        tagName: 'div',

        className: 'view1-item',

        template: _.template(template),

        events: {},

        initialize: function () {},

        render: function (model) {
            this.$el.html(this.template(model));
            return this;
        }

    });

    return View1Item;
});
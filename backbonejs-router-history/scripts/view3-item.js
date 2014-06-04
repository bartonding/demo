define(function (require, exports, module) {

    var template = require('../templates/view3-item.html');

    var View3Item = Backbone.View.extend({

        tagName: 'div',

        className: 'view3-item',

        template: _.template(template),

        events: {},

        initialize: function () {},

        render: function (model) {
            this.$el.html(this.template(model));
            return this;
        }

    });

    return View3Item;
});
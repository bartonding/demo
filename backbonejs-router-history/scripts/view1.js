define(function (require, exports, module) {

    var template = require('../templates/view1.html');

    var View1 = Backbone.View.extend({

        tagName: 'div',

        className: 'results-wraper',

        template: _.template(template),

        events: {
        },

        initialize: function() {
            // this.listenTo(this.model, "change", this.render);
        },

        render: function() {
            this.$el.html(this.template());
            return this;
        },

        _listCache: [],

        _clearList: function () {
            _.each(this._listCache, function (view) {
                view.remove();
            });
        },

        _showLoading: function () {
            this.$el.find('div.results div.ft').show();
        },

        _hideLoading: function () {
            this.$el.find('div.results div.ft').hide();
        },

        renderList: function (json, view) {
            this._showLoading();
            this._clearList();
            var self = this;
            var list = this.$el.find('div.results div.bd');
            _.each(json, function (model) {
                var item = new view();
                self._listCache.push(item);
                list.append(item.render(model).$el);
            });
            this._hideLoading();
        },

        setPaging: function (paging) {
            this.paging = paging;
            this.paging.setElement(this.$el.find('div.paging'));
        },

        renderPaging: function (total, current) {
            this.paging.render(total, current || 1);
        }
    });

    return View1;
});
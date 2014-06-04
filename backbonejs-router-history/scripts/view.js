define(function (require, exports, module) {

    var utils = require('./utils');
    var Paging = require('./paging');

    var View = Backbone.View.extend({

        tagName: 'div',

        className: 'results-wraper',

        getKey: function () {
            return utils.getKey(this.iname[0], this.iname[1]);
        },

        initialize: function(router) {
            this.isFirstRender = false;
            this.router = router;
            this.paging = new Paging(router);
            console.log('view init finish.', this.getKey());
        },

        // 把当前 view 插入到页面中。第一次调用 view.render 时运行
        // 延迟的原因是，Router 和 Tab 还没准备好
        _render: function () {
            this.isFirstRender = true;
            var key = this.router.getKey();
            var ctab = this.router.getTab(key);

            this.$el.html(this.template());

            var content = $('#' + ctab.contentId);
            content.empty().append(this.$el);

            this.paging.setElement(this.$el.find('div.paging'));
        },

        render: function() {
            !this.isFirstRender && this._render();
            var page = this.router.get('page');
            var self = this;
            this._showLoading();
            this.ds.getData({page: page}, function (json) {
                self.paging.render(json.total, page);
                self.renderList(json.items, self.ViewItem);
            });
            this._hideLoading();
            return this;
        },

        renderList: function (json, view) {
            this._clearList();
            var self = this;
            var list = this.$el.find('div.results div.bd');
            _.each(json, function (model) {
                var item = new view();
                self._listCache.push(item);
                list.append(item.render(model).$el);
            });
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
    });

    return View;
});
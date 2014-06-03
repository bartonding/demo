define(function (require, exports, module) {

    var pl = 11; // page elements length
    var pc = 5; // count of pre page
    var DOT_SPACE = '...';

    function doPage (total, current) {
        var t = Math.ceil(total/pc); // 总页码数
        var c = current || 1;
        c = c > t ? t : c < 1 ? 1 : c; // fixed current page

        var o = [], i;

        // 1、如果页码总数小于默认值，则直接输出
        if (t <= pl) {
            for (i = 1; i <= t; i++) o.push(i);
        }
        // 2、如果页码总数大于默认值，需特殊处理，使得当前页的页码尽可能居中
        else {
            var md = Math.ceil(pl/2), i;
            // 2.1 以当前页码为中心，向前/向后递减
            for (i = c - md + 1; i <= c + pl - md; i++) o.push(i);
            // 2.2 修正数组的取值范围为 [1, t]
            (function trimValue(v) {
                if (v !== 'firstTime') {
                    for (var i = 0, l = o.length; i < l; i++) {
                        o[i] = o[i] + v;
                    }
                }
                if (o[0] < 1) trimValue(Math.abs(o[0] - 1));
                if (o[o.length - 1] > t) trimValue(t - o[o.length - 1]);
            })('firstTime');
            // 2.3 满足第一页和最后一页的页码必需出现的要求
            if (o[0] !== 1) { o[0] = 1; o[1] = DOT_SPACE; }
            if (o[o.length - 1] !== t) {
                o[o.length - 1] = t;
                o[o.length - 2] = DOT_SPACE;
            }
        }
        // 当前页码
        o.currentPage = c;
        return o;
    }

    window.paging = doPage;

    var Paging = Backbone.View.extend({

        events: {
            'click a': 'gotopage'
        },

        initialize: function (router) {
            this.router = router;
        },

        gotopage: function (evt) {
            evt.preventDefault();
            var self = $(evt.target);
            var page = self.data('page');
            console.log(page, this.router._status);
            this.router.trigger('pageChange', page);
        },

        createTag: function (tag, content, val, className) {
            val || (val = 0);
            className || (className = '');
            var out = '';
            if (tag === 'span') {
                return [
                    '<span class="', className, '">', content, '</span>'
                ].join('');
            }
            return [
                '<a href="javascript:void(', val ,');" class="', className, '"',
                    'data-page="', val, '">', content, '</a>'
            ].join('');
        },

        generatePaging: function (pages) {
            var o = [], p, cp = pages.currentPage;
            if (cp !== pages[0]) o.push(this.createTag('a', '&lt;', cp - 1));
            for (var i = 0, l = pages.length; i < l; i++) {
                var p = pages[i];
                if (p === DOT_SPACE)
                    o.push(this.createTag('span', DOT_SPACE, '', 'pdot'));
                else if (p === cp)
                    o.push(this.createTag('span', p, p, 'current'));
                else
                    o.push(this.createTag('a', p, p));
            }
            if (cp !== pages[pages.length - 1]) {
                o.push(this.createTag('a', '&gt;', cp + 1));
            }
            return o.join('');
        },

        render: function (total, current) {
            console.log('paging render');
            // this.$el.html(pagingTemplate(total, current).join(', '));
            this.$el.html(this.generatePaging(doPage(total, current)));
            console.log(this.el);
            return this;
        }
    });

    return Paging;
});
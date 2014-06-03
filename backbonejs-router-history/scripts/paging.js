define(function (require, exports, module) {

    var pl = 11; // page elements length
    var pc = 5; // count of pre page
    var dotSpace = '...';

    function pagingTemplate (total, current) {
        var t = Math.ceil(total/pc); // 总页码数
        var c = current || 1;
        c = c > t ? t : c < 1 ? 1 : c; // fixed current page

        var o = [], i;

        if (t <= pl) {
            for (i = 1; i <= pl; i++) {
                o.push(i);
            }
        } else {
            // start, [...], m[1], ..., m[ml], [...], end
            var ml = pl - 4;
            var s = c - Math.ceil(ml/2) - 1;
            s = s < 1 ? 1 : (s + ml - 1) > t ? t - ml : s;
            if (s === 1) ml += 2;
            if (s === 2) ml += 1;
            for (i = 1; i <= ml; i++) {
                o.push(s++);
            }
            console.log(o);
            if (o[0] === 1) {
                o.push(o[]);
            }
        }
    }

    window.paging = pagingTemplate;

    var Paging = Backbone.View.extend({

        events: {},

        render: function (total, current) {
            this.$el.html(pagingTemplate(total, current));
            return this;
        }
    });

    return Paging;
});
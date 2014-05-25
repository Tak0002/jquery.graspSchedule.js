// jQuery.blockSchedule.js v0.0.1
// (c) 2014 Takahiro Watanabe (w-001@sfc.wide.ad.jp)
// The MIT License

(function($) {
    $.fn.graspSchedule = function(paramData) {
        var jqueryThis = this;
        var timeList = new Array();
        var checkParamDate = function() {
            if (typeof paramData === "undefined") {
                return false;
            }
            if(typeof paramData.events === "undefined" && typeof paramData.schedules === "undefined"){
                return false;
            }
            if (typeof paramData.events === "undefined") {
                paramData.events = [];
            }
            if (typeof paramData.schedules === "undefined") {
                paramData.schedules = [];
            }
            if (typeof paramData.options === "undefined") {
                paramData.options = {
                    classnames: {
                        schedule: 'schedule',
                        event: 'event'
                    }
                };
            }
            if (typeof paramData.options.classnames === "undefined") {
                paramData.options.classnames = {schedule: "schedule", event: "event"};
            }
            if (typeof paramData.options.classnames.schedule === "undefined") {
                paramData.options.classnames.schedule = 'schedule';
            }
            if (typeof paramData.options.classnames.event === "undefined") {
                paramData.options.classnames.event = 'event';
            }
            return true;
        };
        var calculateTime = function() {
            for (i1 = 0; i1 < paramData.schedules.length; i1++) {
                timeList.push({time: paramData.schedules[i1].start, kind: 'start', id: i1});
                timeList.push({time: paramData.schedules[i1].end, kind: 'end', id: i1});
            }
            for (i2 = 0; i2 < paramData.events.length; i2++) {
                timeList.push({time: paramData.events[i2].date, kind: 'event', id: i2});
            }
            timeList.sort(
                    function(a, b) {
                        var a = new Date(a.time);
                        var b = new Date(b.time);
                        if (a.getTime() > b.getTime())
                            return 1;
                        if (a.getTime() < b.getTime())
                            return -1;
                        return 0;
                    }
            );
            for (i3 = 0; i3 < timeList.length; i3++) {
                if (timeList[i3].kind === 'start') {
                    var height = 70;
                    for (i4 = i3 + 1; i4 < timeList.length; i4++) {
                        if (timeList[i4].kind === 'end' && timeList[i4].id === timeList[i3].id) {
                            break;
                        }
                        if (timeList[i4].kind === 'event') {
                            height = height + 65;
                        }
                        if (timeList[i4].kind === 'start') {
                            height = height + 80;
                        }
                    }
                    paramData.schedules[timeList[i3].id].height = height;
                }
            }
        };
        var drawBlockSchedule = function() {
            var marginTop = 10;
            var marginLeft = 0;
            var overSchedule = new Array();
            var mostFrontSchedule = null;
            var zIndex = 0;
            var drawEvent = function(id) {
                var id2 = paramData.options.classnames.event + id;
                jqueryThis.append("<div class='" + paramData.options.classnames.event + "' id='" + id2 + "'>" + paramData.events[id].title + "<br>" + paramData.events[id].date + "</div>");
                $("#" + id2).css({
                    marginTop: marginTop,
                    marginLeft: marginLeft,
                    zIndex: zIndex
                });
            };
            var drawSchedule = function(id) {
                var id2 = paramData.options.classnames.schedule + id;
                jqueryThis.append("<div class='" + paramData.options.classnames.schedule + "' id='" + id2 + "'>" + paramData.schedules[id].title + "<br>" + paramData.schedules[id].start + "〜" + paramData.schedules[id].end + "</div>");
                $("#" + id2).css({
                    height: paramData.schedules[id].height,
                    marginTop: marginTop,
                    marginLeft: marginLeft,
                    zIndex: zIndex
                });
                return paramData.schedules[id].height;
            };
            for (i5 = 0; i5 < timeList.length; i5++) {
                var kind = timeList[i5].kind;
                zIndex++;
                if (kind === 'event') {
                    drawEvent(timeList[i5].id);
                    marginTop = marginTop + 70;
                } else if (kind === 'start') {
                    drawSchedule(timeList[i5].id);
                    marginTop = marginTop + 70;
                    overSchedule.push({id: timeList[i5].id, left: marginLeft + 10});
                    mostFrontSchedule = timeList[i5].id;
                    marginLeft = marginLeft + 10;

                } else if (kind === 'end') {
                    marginTop = marginTop + 5;
                    for (i6 = 0; i6 < overSchedule.length; i6++) {
                        if (overSchedule[i6].id === timeList[i5].id) {
                            overSchedule.splice(i6, 1);
                        }
                    }
                    if (overSchedule.length < 1) {
                        marginLeft = 0;
                        marginTop = marginTop + 10;
                    } else if (overSchedule[overSchedule.length - 1].id !== mostFrontSchedule) {
                        marginLeft = overSchedule[overSchedule.length - 1].left;
                        mostFrontSchedule = overSchedule[overSchedule.length - 1].id;
                    }
                }
            }
        };
        if (checkParamDate()) {
            calculateTime();
            drawBlockSchedule();
        }
        return this;
    };
})(jQuery);
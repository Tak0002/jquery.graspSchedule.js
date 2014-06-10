// jQuery.graspSchedule.js v0.0.1
// (c) 2014 Takahiro Watanabe (w-001@sfc.wide.ad.jp)
// The MIT License

(function($) {
    $.fn.graspSchedule = function(paramData) {
        var jqueryThis = this;
        jqueryThis.css('position', 'relative');
        var timeList = new Array();
        var extractNum = function(str) {
            var num = new String(str).match(/\d/g);
            num = num.join("");
            return parseInt(num);
        };
        var comDateFormat = function comDateFormat(time) {
            if (typeof paramData.options.timeFormat === "undefined") {
                return time;
            }
            var date = new Date(time);
            var format = paramData.options.timeFormat;
            var comPadZero = function(value, length) {
                return new Array(length - ('' + value).length + 1).join('0') + value;
            };
            var result = format;
            var f;
            var rep;
            if (typeof paramData.options.daysFormat === "undefined") {
                var yobi = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            } else {
                var yobi = paramData.options.daysFormat;
            }
            f = 'yyyy';
            if (result.indexOf(f) > -1) {
                rep = date.getFullYear();
                result = result.replace(/yyyy/, rep);
            }
            f = 'MM';
            if (result.indexOf(f) > -1) {
                rep = comPadZero(date.getMonth() + 1, 2);
                result = result.replace(/MM/, rep);
            }
            f = 'ddd';
            if (result.indexOf(f) > -1) {
                rep = yobi[date.getDay()];
                result = result.replace(/ddd/, rep);
            }
            f = 'dd';
            if (result.indexOf(f) > -1) {
                rep = comPadZero(date.getDate(), 2);
                result = result.replace(/dd/, rep);
            }
            f = 'HH';
            if (result.indexOf(f) > -1) {
                rep = comPadZero(date.getHours(), 2);
                result = result.replace(/HH/, rep);
            }
            f = 'mm';
            if (result.indexOf(f) > -1) {
                rep = comPadZero(date.getMinutes(), 2);
                result = result.replace(/mm/, rep);
            }
            f = 'ss';
            if (result.indexOf(f) > -1) {
                rep = comPadZero(date.getSeconds(), 2);
                result = result.replace(/ss/, rep);
            }
            f = 'fff';
            if (result.indexOf(f) > -1) {
                rep = comPadZero(date.getMilliseconds(), 3);
                result = result.replace(/fff/, rep);
            }
            return result;
        };
        var checkParamDate = function() {
            if (typeof paramData === "undefined") {
                return false;
            }
            if (typeof paramData.events === "undefined" && typeof paramData.schedules === "undefined") {
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
                        event: 'event',
                        time: 'time'
                    }
                };
            }
            if (typeof paramData.options.classnames === "undefined") {
                paramData.options.classnames = {
                    schedule: "schedule",
                    event: "event",
                    time: "time"
                };
            }
            if (typeof paramData.options.classnames.schedule === "undefined") {
                paramData.options.classnames.schedule = 'schedule';
            }
            if (typeof paramData.options.classnames.event === "undefined") {
                paramData.options.classnames.event = 'event';
            }
            if (typeof paramData.options.classnames.time === "undefined") {
                paramData.options.classnames.time = 'time';
            }
            if (typeof paramData.options.css === "undefined") {
                paramData.options.css = {
                    event: {},
                    schedule: {},
                    zIndexStart: 0,
                    marginTop: "0px",
                    marginLeft: "0px"
                };
            }
            if (typeof paramData.options.css.zIndexStart === "undefined") {
                paramData.options.css.zIndexStart = 0;
            }
            if (typeof paramData.options.css.marginTop === "undefined") {
                paramData.options.css.marginTop = "0px";
            }
            if (typeof paramData.options.css.marginLeft === "undefined") {
                paramData.options.css.marginLeft = "0px";
            }
            return true;
        };
        var getEventHight = function(eventId) {
            if (paramData.events[eventId].css && paramData.events[eventId].css.height) {
                return extractNum(paramData.events[eventId].css.height);
            }
            if (paramData.options.css.event && paramData.options.css.event.height) {
                return extractNum(paramData.options.css.event.height);
            }
            var id2 = paramData.options.classnames.event + eventId + "forTakeHeight";
            jqueryThis.append("<div class='" + paramData.options.classnames.event + "' id='" + id2 + "'>" + paramData.events[eventId].title + "<br>" + paramData.events[eventId].date + "</div>");
            var height = $("#" + id2).css("height");
            $("#" + id2).remove();
            return extractNum(height);
        };
        var getScheduleHight = function(scheduleId) {
            if (paramData.schedules[scheduleId].css && paramData.schedules[scheduleId].css.height) {
                return extractNum(paramData.schedules[scheduleId].css.height);
            }
            if (paramData.options.css.schedule && paramData.options.css.schedule.height) {
                return extractNum(paramData.options.css.schedule.height);
            }
            var id2 = paramData.options.classnames.schedule + scheduleId + "forTakeHeight";
            jqueryThis.append("<div class='" + paramData.options.classnames.schedule + "' id='" + id2 + "'>" + paramData.schedules[scheduleId].title + "<br>" + paramData.schedules[scheduleId].start + "〜" + paramData.schedules[scheduleId].end + "</div>");
            var height = $("#" + id2).css("height");
            $("#" + id2).remove();
            return extractNum(height);
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
                    var height = getScheduleHight(timeList[i3].id);
                    for (i4 = i3 + 1; i4 < timeList.length; i4++) {
                        if (timeList[i4].kind === 'end' && timeList[i4].id === timeList[i3].id) {
                            break;
                        }
                        if (timeList[i4].kind === 'event') {
                            height = height + getEventHight(timeList[i4].id) + 15;
                        }
                        if (timeList[i4].kind === 'start') {
                            height = height + getScheduleHight(timeList[i4].id) + 10;
                        }
                    }
                    paramData.schedules[timeList[i3].id].height = height;
                }
            }
        };
        var drawBlockSchedule = function() {
            var marginTop = extractNum(paramData.options.css.marginTop);
            var marginLeft = extractNum(paramData.options.css.marginLeft);
            if (paramData.options.time) {
                jqueryThis.append("<div class='" + paramData.options.classnames.time + "' id='" + paramData.options.classnames.time + 'testForTime' + "'>" + comDateFormat(timeList[0].time) + "</div>");
                $("#" + paramData.options.classnames.time + 'testForTime').css("position","absolute");
                marginLeft = marginLeft + 10 + extractNum($("#" + paramData.options.classnames.time + 'testForTime').css("width"));
                $("#" + paramData.options.classnames.time + 'testForTime').remove();
                marginTop = marginTop + 10;
            }
            var originalMarginLeft = marginLeft;
            var overSchedule = new Array();
            var mostFrontSchedule = null;
            var zIndex = extractNum(paramData.options.css.zIndexStart);
            var timeLastMarginTop;
            var timeLastHeight;
            var timeLast;
            var drawEvent = function(id) {
                var id2 = paramData.options.classnames.event + id;
                jqueryThis.append("<div class='" + paramData.options.classnames.event + "' id='" + id2 + "'>" + paramData.events[id].title + "<br>" + comDateFormat(paramData.events[id].date) + "</div>");
                var css = {};
                if (paramData.events[id].css) {
                    css = $.extend(true, {}, paramData.events[id].css);
                } else if(paramData.options.css.event){
                    css = $.extend(true, {}, paramData.options.css.event);
                }
                css.marginTop = marginTop;
                css.marginLeft = marginLeft;
                css.zIndex = zIndex;
                css.position = "absolute";
                $("#" + id2).css(css);
                return extractNum($("#" + id2).css("height"));
            };
            var drawSchedule = function(id) {
                var id2 = paramData.options.classnames.schedule + id;
                var css = {};
                if (paramData.schedules[id].css) {
                    css = $.extend(true, {}, paramData.schedules[id].css);
                } else if(paramData.options.css.schedule){
                    css = $.extend(true, {}, paramData.options.css.schedule);
                }
                css.height = paramData.schedules[id].height + "px";
                css.marginTop = marginTop;
                css.marginLeft = marginLeft;
                css.zIndex = zIndex;
                css.position = "absolute";
                jqueryThis.append("<div class='" + paramData.options.classnames.schedule + "' id='" + id2 + "'>" + paramData.schedules[id].title + "<br>" + comDateFormat(paramData.schedules[id].start) + " - " + comDateFormat(paramData.schedules[id].end) + "</div>");
                $("#" + id2).css(css);
                return paramData.schedules[id].height;
            };
            var drawTime = function(time) {
                var date = new Date(time);
                var id2 = paramData.options.classnames.time + date.getTime();
                if (timeLast && timeLast === time) {
                    timeLast = time;
                    return false;
                }
                var css = {};
                css.marginTop = marginTop;
                css.marginTop = css.marginTop - 10;
                if (timeLastMarginTop && timeLastMarginTop + timeLastHeight > css.marginTop) {
                    css.marginTop = timeLastMarginTop + timeLastHeight;
                }
                css.marginLeft = 0;
                css.zIndex = zIndex;
                css.position = "absolute";
                jqueryThis.append("<div class='" + paramData.options.classnames.time + "' id='" + id2 + "'>" + comDateFormat(time) + "</div>");
                $("#" + id2).css(css);
                timeLastHeight = extractNum($("#" + id2).css("height"));
                timeLastMarginTop = css.marginTop;
                timeLast = time;
                zIndex++;
            };
            for (i5 = 0; i5 < timeList.length; i5++) {
                var kind = timeList[i5].kind;
                zIndex++;
                if (paramData.options.time) {
                    drawTime(timeList[i5].time);
                }
                if (kind === 'event') {
                    marginTop = marginTop + drawEvent(timeList[i5].id) + 20;
                } else if (kind === 'start') {
                    drawSchedule(timeList[i5].id);
                    marginTop = marginTop + getScheduleHight(timeList[i5].id);
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
                        marginLeft = originalMarginLeft;
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
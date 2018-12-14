// jQuery.graspSchedule.js v0.2.0
// (c) 2015 Takahiro Watanabe (w@wepia.biz)
// http://wepia.biz
// The MIT License

(function ($) {
    $.fn.graspSchedule = function (paramData) {
        var jqueryThis = this;
        var defaults = {
            schedules: [],
            events: [],
            options: {
                classnames: {
                    schedule: "schedule",
                    event: "event",
                    time: "time"
                },
                css: {
                    event: {
                    },
                    schedule: {
                    },
                    zIndexStart: 0,
                    marginTop: "0px",
                    marginLeft: "0px"
                },
                time: true,
                insideTime:true,
                timeFormat: 'yyyy/MM/dd(ddd)HH:mm',
                daysFormat: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            }
        };
        var extractNum = function (str) {
            var num = new String(str).match(/\d/g);
            num = num.join("");
            return parseInt(num);
        };
        var comDateFormat = function comDateFormat(time) {
            var date = new Date(time);
            var format = paramData.options.timeFormat;
            var comPadZero = function (value, length) {
                return new Array(length - ('' + value).length + 1).join('0') + value;
            };
            var result = format;
            var f;
            var rep;
            var yobi = paramData.options.daysFormat;
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
        var checkParamDate = function () {
            if (typeof paramData === "undefined" || (typeof paramData.events === "undefined" && typeof paramData.schedules === "undefined")) {
                return false;
            }
            paramData = $.extend(true, defaults, paramData);
            return true;
        };
        var getEventHight = function (eventId) {
            if (paramData.events[eventId].css && paramData.events[eventId].css.height) {
                return extractNum(paramData.events[eventId].css.height);
            }
            if (paramData.options.css.event && paramData.options.css.event.height) {
                return extractNum(paramData.options.css.event.height);
            }
            var id2 = paramData.options.classnames.event + eventId + "forTakeHeight";
            if(paramData.options.insideTime){
                jqueryThis.append("<div class='" + paramData.options.classnames.event + "' id='" + id2 + "'>" + paramData.events[eventId].title + "<br>" + paramData.events[eventId].date + "</div>");
            } else {
                jqueryThis.append("<div class='" + paramData.options.classnames.event + "' id='" + id2 + "'>" + paramData.events[eventId].title + "</div>");
            }
            var height = $("#" + id2).css("height");
            $("#" + id2).remove();
            return extractNum(height);
        };
        var getScheduleHight = function (scheduleId) {
            if (paramData.schedules[scheduleId].css && paramData.schedules[scheduleId].css.height) {
                return extractNum(paramData.schedules[scheduleId].css.height);
            }
            if (paramData.options.css.schedule && paramData.options.css.schedule.height) {
                return extractNum(paramData.options.css.schedule.height);
            }
            var id2 = paramData.options.classnames.schedule + scheduleId + "forTakeHeight";
            if(paramData.options.insideTime){
                jqueryThis.append("<div class='" + paramData.options.classnames.schedule + "' id='" + id2 + "'>" + paramData.schedules[scheduleId].title + "<br>" + paramData.schedules[scheduleId].start + "-" + paramData.schedules[scheduleId].end + "</div>");
            } else {
                jqueryThis.append("<div class='" + paramData.options.classnames.schedule + "' id='" + id2 + "'>" + paramData.schedules[scheduleId].title + "</div>");
            }
            var height = $("#" + id2).css("height");
            $("#" + id2).remove();
            return extractNum(height);
        };
        var calculateTime = function () {
            var timeList = new Array();
            for (i1 = 0; i1 < paramData.schedules.length; i1++) {
                timeList.push({time: paramData.schedules[i1].start, kind: 'start', id: i1});
                timeList.push({time: paramData.schedules[i1].end, kind: 'end', id: i1});
            }
            for (i2 = 0; i2 < paramData.events.length; i2++) {
                timeList.push({time: paramData.events[i2].date, kind: 'event', id: i2});
            }
            timeList.sort(
                    function (a, b) {
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
                            height = height + getScheduleHight(timeList[i4].id) + 5;
                        }
                    }
                    paramData.schedules[timeList[i3].id].height = height;
                }
            }
            return timeList;
        };
        var graspSchedule = {
            marginTop: 0,
            marginLeft: 0,
            originalMarginLeft: 0,
            overSchedule: new Array(),
            mostFrontSchedule: null,
            zIndex: 0,
            timeLastMarginTop: null,
            timeLastHeight: null,
            timeLast: null,
            set: function () {
                this.marginTop = extractNum(paramData.options.css.marginTop);
                this.marginLeft = extractNum(paramData.options.css.marginLeft);
                this.zIndex = extractNum(paramData.options.css.zIndexStart);
                if (paramData.options.time) {
                    var nowdate = new Date();
                    jqueryThis.append("<div class='" + paramData.options.classnames.time + "' id='" + paramData.options.classnames.time + 'testForTime' + "'>" + comDateFormat(nowdate.getTime()) + "</div>");
                    $("#" + paramData.options.classnames.time + 'testForTime').css("position", "absolute");
                    this.marginLeft = this.marginLeft + 10 + extractNum($("#" + paramData.options.classnames.time + 'testForTime').css("width"));
                    $("#" + paramData.options.classnames.time + 'testForTime').remove();
                    this.marginTop = this.marginTop + 10;
                }
                this.originalMarginLeft = this.marginLeft;
            },
            drawEvent: function (id) {
                var id2 = paramData.options.classnames.event + id;
                if(paramData.options.insideTime){
                    jqueryThis.append("<div class='" + paramData.options.classnames.event + "' id='" + id2 + "'>" + paramData.events[id].title + "<br>" + comDateFormat(paramData.events[id].date) + "</div>");
                }else{
                    jqueryThis.append("<div class='" + paramData.options.classnames.event + "' id='" + id2 + "'>" + paramData.events[id].title + "</div>");
                }
                var css = {};
                if (paramData.events[id].css) {
                    css = $.extend(true, {}, paramData.events[id].css);
                } else if (paramData.options.css.event) {
                    css = $.extend(true, {}, paramData.options.css.event);
                }
                css.marginTop = this.marginTop;
                css.marginLeft = this.marginLeft;
                css.zIndex = this.zIndex;
                css.position = "absolute";
                $("#" + id2).css(css);
                return extractNum($("#" + id2).css("height"));
            },
            drawSchedule: function (id) {
                var id2 = paramData.options.classnames.schedule + id;
                var css = {};
                if (paramData.schedules[id].css) {
                    css = $.extend(true, {}, paramData.schedules[id].css);
                } else if (paramData.options.css.schedule) {
                    css = $.extend(true, {}, paramData.options.css.schedule);
                }
                css.height = paramData.schedules[id].height + "px";
                css.marginTop = this.marginTop;
                css.marginLeft = this.marginLeft;
                css.zIndex = this.zIndex;
                css.position = "absolute";
                if(paramData.options.insideTime){
                    jqueryThis.append("<div class='" + paramData.options.classnames.schedule + "' id='" + id2 + "'>" + paramData.schedules[id].title + "<br>" + comDateFormat(paramData.schedules[id].start) + " - " + comDateFormat(paramData.schedules[id].end) + "</div>");
                }else{
                    jqueryThis.append("<div class='" + paramData.options.classnames.schedule + "' id='" + id2 + "'>" + paramData.schedules[id].title + "</div>");
                }
                $("#" + id2).css(css);
                return paramData.schedules[id].height;
            },
            drawTime: function (time) {
                var date = new Date(time);
                var id2 = paramData.options.classnames.time + date.getTime();
                if (this.timeLast && this.timeLast === time) {
                    this.timeLast = time;
                    return false;
                }
                var css = {};
                css.marginTop = this.marginTop;
                css.marginTop = css.marginTop - 10;
                if (this.timeLastMarginTop && this.timeLastMarginTop + this.timeLastHeight > css.marginTop) {
                    css.marginTop = this.timeLastMarginTop + this.timeLastHeight;
                }
                css.marginLeft = 0;
                css.zIndex = this.zIndex;
                css.position = "absolute";
                jqueryThis.append("<div class='" + paramData.options.classnames.time + "' id='" + id2 + "'>" + comDateFormat(time) + "</div>");
                $("#" + id2).css(css);
                this.timeLastHeight = extractNum($("#" + id2).css("height"));
                this.timeLastMarginTop = css.marginTop;
                this.timeLast = time;
                this.zIndex++;
            },
            render: function () {
                jqueryThis.css('position', 'relative');
                this.set();
                timeList = calculateTime();
                for (var i5 = 0; i5 < timeList.length; i5++) {
                    var kind = timeList[i5].kind;
                    this.zIndex++;
                    if (paramData.options.time) {
                        this.drawTime(timeList[i5].time);
                    }
                    if (kind === 'event') {
                        this.marginTop = this.marginTop + this.drawEvent(timeList[i5].id) + 20;
                    } else if (kind === 'start') {
                        this.drawSchedule(timeList[i5].id);
                        this.marginTop = this.marginTop + getScheduleHight(timeList[i5].id);
                        this.overSchedule.push({id: timeList[i5].id, left: this.marginLeft + 10});
                        this.mostFrontSchedule = timeList[i5].id;
                        this.marginLeft = this.marginLeft + 10;
                    } else if (kind === 'end') {
                        this.marginTop = this.marginTop + 5;
                        for (var i6 = 0; i6 < this.overSchedule.length; i6++) {
                            if (this.overSchedule[i6].id === timeList[i5].id) {
                                this.overSchedule.splice(i6, 1);
                            }
                        }
                        if (this.overSchedule.length < 1) {
                            this.marginLeft = this.originalMarginLeft;
                            this.marginTop = this.marginTop + 10;
                        } else if (this.overSchedule[this.overSchedule.length - 1].id !== this.mostFrontSchedule) {
                            this.marginLeft = this.overSchedule[this.overSchedule.length - 1].left;
                            this.mostFrontSchedule = this.overSchedule[this.overSchedule.length - 1].id;
                        }
                    }
                }
            }
        };
        if (checkParamDate()) {
            graspSchedule.render();
        }
        return jqueryThis;
    };
})(jQuery);

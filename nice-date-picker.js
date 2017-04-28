/**
 * nice date picker
 * Created by ollie on 2017/4/27.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.niceDatePicker = factory());
}(this, function () {
    'use strict';

    var niceDatePicker = {};
    var $warpper, monthData;
    niceDatePicker.getMonthData = function (year, month) {
        var year, month;
        var ret = [];

        if (!year || !month) {

            var today = new Date();

            year = today.getFullYear();

            month = today.getMonth() + 1;
        }
        var firstDay = new Date(year, month - 1, 1);//当月的第一天

        var firstDayWeekDay = firstDay.getDay();//当月第一天是周几

        if (firstDayWeekDay === 0) {

            firstDayWeekDay = 7;
        }

        year = firstDay.getFullYear();

        month = firstDay.getMonth() + 1;


        var lastDayOfLastMonth = new Date(year, month - 1, 0);//上个月的最后一天

        var lastDateOfLastMonth = lastDayOfLastMonth.getDate();//上个月最后一天是几号

        var preMonthDayCount = firstDayWeekDay - 1;//需要显示上个月几个日期

        var lastDay = new Date(year, month, 0);//当月的最后一天

        var lastDate = lastDay.getDate()//当月最后天是几号
        var styleCls = '';
        for (var i = 0; i < 7 * 6; i++) {

            var date = i + 1 - preMonthDayCount;

            var showDate = date;

            var thisMonth = month;

            if (date <= 0) {
                //上个月
                thisMonth = month - 1;
                showDate = lastDateOfLastMonth + date;
                styleCls = 'nice-gray';

            } else if (date > lastDate) {
                thisMonth = month + 1;
                showDate = showDate - lastDate;
                styleCls = 'nice-gray';
            } else {
                var today = new Date();
                if (showDate === today.getDate() && thisMonth === today.getMonth() + 1) {
                    styleCls = 'nice-normal nice-current';
                } else {
                    styleCls = 'nice-normal';
                }


            }

            if (thisMonth === 13) {
                thisMonth = 1;
            }
            if (thisMonth === 0) {
                thisMonth = 12;
            }

            ret.push({
                month: thisMonth,
                date: date,
                showDate: showDate,
                styleCls: styleCls
            });
        }
        return {
            year: year,
            month: month,
            date: ret
        };
    };

    niceDatePicker.buildUi = function (year, month) {
        monthData = niceDatePicker.getMonthData(year, month);

        var html = '<div class="nice-date-picker-warpper">' +
            '<div class="nice-date-picker-header">' +
            '<a href="javascript:;" class="prev-date-btn">&lt;</a>' +
            '<span class="nice-date-title">' + monthData.year + '年 - ' + monthData.month + '月</span>' +
            '<a href="javascript:;" class="next-date-btn">&gt;</a>' +
            '</div>' +
            '<div class="nice-date-picker-body">' +
            '<table>' +
            '<thead>' +
            '<tr>' +
            '<th>一</th>' +
            '<th>二</th>' +
            '<th>三</th>' +
            '<th>四</th>' +
            '<th>五</th>' +
            '<th>六</th>' +
            '<th>日</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';

        for (var i = 0; i < monthData.date.length; i++) {
            if (i % 7 === 0) {
                html += '<tr>';
            }
            html += '<td class="' + monthData.date[i].styleCls + '">' + monthData.date[i].showDate + '</td>';
            if (i % 7 === 6) {
                html += '</tr>';
            }
        }

        html += '</tbody>' +
            '</table>' +
            '</div>' +
            '</div>';


        return html;

    };

    niceDatePicker.render = function (direction) {
        var year, month;
        if (monthData) {

            year = monthData.year;
            month = monthData.month;

        }
        if (direction === 'prev') {
            month--;
            if (month === 0) {
                month = 12;
                year--;
            }
        }
        if (direction === 'next') {
            month++;

        }
        var html = niceDatePicker.buildUi(year, month);
        $warpper.innerHTML = html;
    };
    niceDatePicker.init = function ($params) {
        $warpper = $params.dom;
        niceDatePicker.render();
        $warpper.addEventListener('click', function (e) {
            var $target = e.target;
            if ($target.classList.contains('prev-date-btn')) {

                niceDatePicker.render('prev');

            }
            if ($target.classList.contains('next-date-btn')) {

                niceDatePicker.render('next');

            }
            if ($target.classList.contains('nice-normal')) {

                alert(monthData.year+'-'+monthData.month)

            }
        }, false);
        /*$warpper.addEventListener('click', function (e) {

            if ($target.classList.contains('nice-normal')) {

                alert(monthData.year+'-'+monthData.month)

            }
        }, false);*/

    };
    return niceDatePicker;
}));
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.dictionary = void 0;
var baseDictionary = {
    time: 'Time',
    command: 'Command',
    title: 'Title'
};
exports.dictionary = {
    dailyTimelineTable: {
        column: __assign({}, baseDictionary)
    },
    dailyTimelineTableTitle: 'Daily jobs',
    monthlyTimelineTable: {
        column: __assign({ day: 'Day' }, baseDictionary)
    },
    monthlyTimelineTableTitle: 'Monthly jobs',
    yearlyTimelineTable: {
        column: __assign({ month: 'Month', day: 'Day' }, baseDictionary)
    },
    yearlyTimelineTableTitle: 'Other jobs',
    jobListTable: {
        field: {
            month: 'Month',
            day: 'Day',
            time: 'Time',
            command: 'Command'
        }
    },
    jobListTableTitle: 'Job list'
};

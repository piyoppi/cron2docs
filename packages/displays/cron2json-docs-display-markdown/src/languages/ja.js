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
    time: '時刻',
    command: 'コマンド',
    title: 'タイトル'
};
exports.dictionary = {
    dailyTimelineTable: {
        column: __assign({}, baseDictionary)
    },
    dailyTimelineTableTitle: '日時ジョブ',
    monthlyTimelineTable: {
        column: __assign({ day: '日' }, baseDictionary)
    },
    monthlyTimelineTableTitle: '月次ジョブ',
    yearlyTimelineTable: {
        column: __assign({ month: '月', day: '日' }, baseDictionary)
    },
    yearlyTimelineTableTitle: 'そのほかのジョブ',
    jobListTable: {
        field: {
            month: '月',
            day: '日',
            time: '時刻',
            command: 'コマンド'
        }
    },
    jobListTableTitle: 'ジョブ一覧'
};

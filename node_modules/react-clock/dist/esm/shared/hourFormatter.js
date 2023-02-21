import getUserLocale from 'get-user-locale';
export var formatHour = function (locale, hour) {
    return hour.toLocaleString(locale || getUserLocale());
};

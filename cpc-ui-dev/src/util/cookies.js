/**
 * Cookies 操作
 */

export default class cookie {
    static setCookie(name, value, expiredays) {
        let exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = name + '=' + escape(value) + (expiredays === null ? '' : ';expires=' + exdate.toUTCString() + ';path=/');
    }
    static getCookie(name) {
        if (document.cookie.length > 0) {
            let start = document.cookie.indexOf(name + '=');
            if (start !== -1) {
                start = start + name.length + 1;
                let end = document.cookie.indexOf(';', start);
                if (end === -1)
                    end = document.cookie.length;
                return unescape(document.cookie.substring(start, end));
            }
        }
        return '';
    }
    static clearCookie(filterKey) {
        var keys = document.cookie.match(/[^ =;]+(?==)/g) || [];
        if (filterKey) { // 不清除的cookie
            keys = keys.filter(function(str) {
                return str.indexOf(filterKey) === -1;
            });
        }
        if (keys) {
            for (let i = keys.length; i--;) {
                document.cookie = keys[i] + '=0;expires=' + new Date().toUTCString();
            }
        }
    }
}
;

import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {

    constructor() { }

    setCookie(cname, cvalue, exhours) {
        const d = new Date();
        d.setTime(d.getTime() + (exhours * 60 * 60 * 1000) - (d.getTimezoneOffset() * 60000));
        const expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
    }

    getCookie(cname) {
        const name = cname + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
            c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
            }
        }
        return '';
    }

    deleteCookie(cname) {
        document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
}

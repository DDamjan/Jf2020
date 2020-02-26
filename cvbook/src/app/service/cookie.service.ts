import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, filter } from 'rxjs/operators';
import * as conn from '../../constants/server-urls';

@Injectable()
export class CookieService {

    private serverURL = conn.LOCAL_SERVER + 'token/';

    constructor( private http: HttpClient) { }

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.getCookie('CVBook-Token')
        })
    };

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

    checkToken(data: object): Observable<any> {
        const url = `${this.serverURL}check`;
        return this.http.post<any>(url, data, this.httpOptions).pipe(
            catchError(this.handleError<any>('authCompany'))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}

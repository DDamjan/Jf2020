import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { catchError, tap, filter } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';
import * as conn from '../../constants/server-urls';
import { CookieService } from './cookie.service';

@Injectable()
export class CompanyService {

   // private serverURL = conn.PUBLIC_SERVER_DAMJAN + 'kompanija/';
     private serverURL = conn.LOCAL_SERVER + 'kompanija/';
    // private serverURL = conn.PUBLIC_SERVER + 'kompanija/';

    constructor(
        private http: HttpClient,
        private httpService: HttpService) { }

    getCompany(payload: any): Observable<any> {
        const url = `${this.serverURL}?id=${payload.id}&auth=${payload.auth}`;
        return this.http.get<any>(url).pipe(
            catchError(this.handleError<any>(`getCompany id=${payload.id}`))
        );
    }

    authCompany(data: object): Observable<any> {
        const url = `${this.serverURL}auth`;
        return this.http.post<any>(url, data, this.httpService.httpOptions()).pipe(
            catchError(this.handleError<any>('authCompany'))
        );
    }

    formOptions(): Observable<any> {
        const url = `${this.serverURL}formOptions`;
        return this.http.post<any>(url, {}, this.httpService.httpOptions()).pipe(
            catchError(this.handleError<any>('formOptions'))
        );
    }

    addToHistory(userID, kompanijaID): Observable<any> {
        const url = `${this.serverURL}history/add`;
        return this.http.post<any>(url, {userID, kompanijaID}, this.httpService.httpOptions()).pipe(
            catchError(this.handleError<any>('addToHistory'))
        );
    }

    getHistory(kompanijaID): Observable<any> {
        const url = `${this.serverURL}history/get`;
        return this.http.post<any>(url, {kompanijaID}, this.httpService.httpOptions()).pipe(
            catchError(this.handleError<any>('addToHistory'))
        );
    }

    addToFavourites(payload): Observable<any> {
        const url = `${this.serverURL}favourites/add`;
        return this.http.post<any>(url, payload, this.httpService.httpOptions()).pipe(
            catchError(this.handleError<any>('addToFavourites'))
        );
    }

    removeFromFavourites(payload): Observable<any> {
        const url = `${this.serverURL}favourites/remove`;
        return this.http.post<any>(url, payload, this.httpService.httpOptions()).pipe(
            catchError(this.handleError<any>('addToFavourites'))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}

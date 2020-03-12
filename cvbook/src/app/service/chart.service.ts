import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { catchError, tap, filter } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';
import * as conn from '../../constants/server-urls';
import { CookieService } from './cookie.service';

@Injectable()
export class ChartService {

    // private serverURL = conn.PUBLIC_SERVER_DAMJAN + 'kompanija/';
    private serverURL = conn.LOCAL_SERVER + 'kompanija/stats/';

    constructor(
        private http: HttpClient,
        private httpService: HttpService) { }


    getChart(): Observable<any> {
        const url = `${this.serverURL}`;
        return this.http.post<any>(url, {}, this.httpService.httpOptions()).pipe(
            catchError(this.handleError<any>(`getChart`))
        );
    }

    // getChartCV(): Observable<any> {
    //     const url = `${this.serverURL}`;
    //     return this.http.post<any>(url, {'type': 'cv'}, this.httpService.httpOptions()).pipe(
    //         catchError(this.handleError<any>(`getChartCV`))
    //     );
    // }

    // getChartTotalUsers(): Observable<any> {
    //     const url = `${this.serverURL}`;
    //     return this.http.post<any>(url, {'type': 'totalUsers'}, this.httpService.httpOptions()).pipe(
    //         catchError(this.handleError<any>(`getChartTotalUsers`))
    //     );
    // }
    // console.log('getUserSERVICE');

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}

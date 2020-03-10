import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from './cookie.service';

@Injectable()
export class HttpService {
    constructor(private cookieService: CookieService ) { }

    public httpOptions() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.cookieService.getCookie('CVBook-Token')
            })
        };
    }
}

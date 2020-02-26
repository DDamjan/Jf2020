import { Component, OnInit, DoCheck } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from './service/cookie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, DoCheck {
  title = 'NGDispatcher';
  loggedIn: boolean;

  constructor(private store: Store<any>,
              private cookieService: CookieService) { }
  public ngOnInit() {
  }

  public ngDoCheck() {
    this.cookieService.getCookie('CVBook-Token');
    localStorage.getItem('CVBook-CurrentCompany') != null ? this.loggedIn = true : this.loggedIn = false;
  }
}

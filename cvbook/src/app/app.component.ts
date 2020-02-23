import { Component, OnInit, DoCheck } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, DoCheck {
  title = 'NGDispatcher';
  loggedIn: boolean;

  constructor(private store: Store<any>) { }
  public ngOnInit() {
  }

  public ngDoCheck() {
    localStorage.getItem('CVBook-CurrentCompany') != null ? this.loggedIn = true : this.loggedIn = false;
  }
}

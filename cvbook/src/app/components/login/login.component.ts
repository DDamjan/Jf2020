import { Component, OnInit, DoCheck } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '../../store/actions';
import { Router } from '@angular/router';
import { selectAllCompanies } from 'app/store/reducers/company.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, DoCheck {
  public error: boolean;
  constructor(private store: Store<any>, private router: Router) { this.error = false; }
  ngOnInit() {
  }

  onSubmit($event) {
    const payload = {
      username: $event.target[0].value,
      password: $event.target[1].value
    };

    this.store.dispatch(new actions.AuthCompany(payload));
  }

  ngDoCheck() {
    this.store.select(selectAllCompanies).subscribe(currentUser => {
      if (currentUser.length !== 0) {
        if (currentUser[currentUser.length - 1].username === 'error') {
          this.error = true;
        }
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '../../store/actions';
import { selectAllUser } from '../../store/reducers/user.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private store: Store<any>, private router: Router) { }

  ngOnInit() {
  }

  toCVOverview() {
    this.router.navigate(['cvoverview']);
  }
}

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
  public dataPointsYearOfStudy: any;
  public pieChartLabels: any;
  constructor(private store: Store<any>, private router: Router) { }

  ngOnInit() {
    this.dataPointsYearOfStudy = [29, 17];
    this.pieChartLabels = [['Zavrseno'], ['Ostalo']];
    // this.store.dispatch(new actions.GetUsers({}));
    // this.store.select(selectAllUsers).subscribe(data => {
    //   console.log('dataPointsYearOfStudy');
    //   console.log(data);
    //   // if (users.length !== 0) {
    //   //   this.userList = users;
    //   // }
    // });
  }

  toCVOverview() {
    this.router.navigate(['cvoverview']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '../../store/actions';
import { selectAllUser } from '../../store/reducers/user.reducer';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Router } from '@angular/router';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public dataPointsYearOfStudy: any;
  public pieChartLabels: any;
  public barChartLabels: Label[];
  public barChartData: ChartDataSets[];
  constructor(private store: Store<any>, private router: Router) { }

  ngOnInit() {
    this.dataPointsYearOfStudy = [29, 17];
    this.pieChartLabels = [['Zavrseno'], ['Ostalo']];
    this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    this.barChartData = [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ];
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

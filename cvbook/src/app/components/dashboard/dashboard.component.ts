import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as actions from '../../store/actions';
import { selectAllUser } from '../../store/reducers/user.reducer';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

import { Label } from 'ng2-charts';
import { selectAllCharts } from 'app/store/reducers/charts.reducer';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public BESTimage: any;
  public JF20image: any;
  public pieChartLabels: any;
  public pieChartData: any;
  public barChartLabels: Label[];
  public barChartData: ChartDataSets[];
  public totalUsersData: any;
  public isReady: boolean;
  constructor(private store: Store<any>, private router: Router) { }

  ngOnInit() {
    this.isReady = false;
    // const __dirname = path.resolve();
    // this.BESTimage = __dirname.substring(0, __dirname.indexOf('/src')) + '/repo/BESTnis.png';
    // this.JF20image = __dirname.substring(0, __dirname.indexOf('/src')) + '/repo/JobFair20.png';
    // this.BESTimage = '../../../../repo/BESTnis.png';
    // this.JF20image = '../../../../repo/JobFair20.png';

    this.store.select(selectAllCharts).subscribe(data => {
      if (data.length === 0 ) {
        this.store.dispatch(new actions.GetChart({}));
        this.isReady = false;
      } else {
        this.pieChartLabels = data[0].labels;
        this.pieChartData = data[0].data;
        this.barChartLabels = data[1].labels;
        this.barChartData = data[1].data;
        this.totalUsersData = data[2].data;
        this.isReady = true;
      }
    });
  }

  toCVOverview() {
    this.router.navigate(['cvoverview']);
  }
}

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap} from 'rxjs/operators';

import * as actions from '../actions';
import { Store } from '@ngrx/store';
import { ofAction } from 'ngrx-actions/dist';
import { Router } from '@angular/router';
import { ChartService } from '../../service/chart.service';
import { CookieService } from '../../service/cookie.service';
import { Chart } from '../../models/Chart';
import { Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';

@Injectable()
export class ChartEffects {
  constructor(
    private store: Store<any>,
    private update$: Actions,
    private router: Router,
    private chartService: ChartService,
    private cookieService: CookieService) { }

  @Effect()

  getChart$ = this.update$.pipe(
    ofAction(actions.GetChart),
    switchMap(chart => this.chartService.getChart()),
    map(response => {
      console.log('getChart');
      console.log(response);
      if (response.success !== undefined && response.success === false) {
        this.badToken();
        return new actions.TokenExpired();
      } else {
        let labelFaculty: Label[];
        let dataFaculty: ChartDataSets[];

        labelFaculty = [];
        dataFaculty = [{data: [], label: ''}];

        dataFaculty[0].label = 'Faculties';
        response.top10.forEach(row => {
          labelFaculty.push(row.naziv);
          dataFaculty[0].data.push(row.broj);
        });
        let charts: Chart[];
        charts = [
          {
            chartID: 1,
            labels: [['Uploaded CV'], ['No CV']],
            data: [response.cv.postavili, response.cv.nisuPostavili]
          },
          {
            chartID: 2,
            labels: labelFaculty,
            data: dataFaculty
          },
          {
            chartID: 3,
            labels: [['Total amount of users']],
            data: [response.totalUsers.broj]
          },
        ];
        return new actions.GetChartSuccess(charts);
      }
    })
  );

  // getChartCV$ = this.update$.pipe(
  //   ofAction(actions.GetChartCV),
  //   switchMap(chart => this.chartService.getChartCV()),
  //   map(response => {
  //     console.log('getChartCV');
  //     console.log(response);
  //     if (response.success !== undefined && response.success === false) {
  //       this.badToken();
  //       return new actions.TokenExpired();
  //     } else {
  //       let pieChartCVUploads: Chart;
  //       pieChartCVUploads = {
  //         chartID: 1,
  //         labels: [['UploadedCV'], ['NoCV']],
  //         data: [response.postavili, response.nisuPostavili]
  //       };
  //       return new actions.GetChartCVSuccess(pieChartCVUploads);
  //     }
  //   })
  // );

  // @Effect()
  // getChartTop10$ = this.update$.pipe(
  //   ofAction(actions.GetChartTop10),
  //   switchMap(chart => this.chartService.getChartTop10()),
  //   map(response => {
  //     console.log('getChartTop10');
  //     console.log(response);
  //     if (response[0].success !== undefined && response[0].success === false) {
  //       this.badToken();
  //       return new actions.TokenExpired();
  //     } else {
  //       return new actions.GetChartTop10Success(response[0]);
  //     }
  //   })
  // );

  // @Effect()
  // getChartTotalUsers$ = this.update$.pipe(
  //   ofAction(actions.GetChartTotalUsers),
  //   switchMap(chart => this.chartService.getChartTotalUsers()),
  //   map(response => {
  //     console.log('getChartTotalUsers');
  //     console.log(response);
  //     if (response[0].success !== undefined && response[0].success === false) {
  //       this.badToken();
  //       return new actions.TokenExpired();
  //     } else {
  //       return new actions.GetChartTotalUsersSuccess(response[0]);
  //     }
  //   })
  // );


  badToken() {
    // console.log('BAD TOKEN COMPANY');
    localStorage.removeItem('CVBook-CurrentCompany');
    this.cookieService.deleteCookie('CVBook-Token');
    this.router.navigate(['/']);
  }
}

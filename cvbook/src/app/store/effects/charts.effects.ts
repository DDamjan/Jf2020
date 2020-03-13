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
      if (Array.isArray(response) && response[0].success !== undefined && response[0].success === false) {
        this.badToken();
        return new actions.TokenExpired();
      } else {
        return new actions.GetChartSuccess(this.makeChartsObject(response));
      }
    })
  );

  makeChartsObject(response) {
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
    return charts = [
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
  }

  badToken() {
    localStorage.removeItem('CVBook-CurrentCompany');
    this.cookieService.deleteCookie('CVBook-Token');
    this.router.navigate(['/']);
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatGridListModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatTabsModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { reducers } from './store/reducers';
import { UserEffects } from './store/effects/user.effects';
import { CompanyEffects } from './store/effects/company.effects';
import { UserService } from './service/user.service';
import { HttpService } from './service/http.service';
import { CompanyService } from './service/company.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailExpansionComponent } from './components/detail-expansion/detail-expansion.component';
import { CvOverviewComponent } from './components/cv-overview/cv-overview.component';
import { FilterComponent } from './components/filter/filter.component';
import { CookieService } from './service/cookie.service';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { PieChartComponent } from './components/charts/piechart/piechart.component';
import { BasicColumnChartComponent } from './components/charts/basiccolumnchart/basiccolumnchart.component';
import { ChartsModule } from 'ng2-charts';
import { ChartEffects } from './store/effects/charts.effects';
import { ChartService } from './service/chart.service';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    LoginComponent,
    DashboardComponent,
    DetailExpansionComponent,
    CvOverviewComponent,
    FilterComponent,
    UserCardComponent,
    UserDetailsComponent,
    PieChartComponent,
    BasicColumnChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatTabsModule,
    MatExpansionModule,
    MatCheckboxModule,
    StoreDevtoolsModule,
    FormsModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({}),
    RouterModule,
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([UserEffects, CompanyEffects, ChartEffects]),
    HttpClientModule,
    MatSnackBarModule,
    MatTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    ChartsModule
  ],
  providers: [UserService, CompanyService, CookieService, HttpService, ChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }

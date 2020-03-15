import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './service/guard/login.guard';
import { AuthGuard } from './service/guard/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CvOverviewComponent } from './components/cv-overview/cv-overview.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { HistoryComponent } from './components/history/history.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'cvoverview', component: CvOverviewComponent, canActivate: [AuthGuard] },
  { path: 'userdetails/:id', component: UserDetailsComponent, canActivate: [AuthGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full', canActivate: [LoginGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

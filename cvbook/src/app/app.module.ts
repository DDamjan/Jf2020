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
  MatExpansionModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { LoginComponent } from './components/login/login.component';
import { reducers } from './store/reducers';
import { UserEffects } from './store/effects/user.effects';
import { UserService } from './service/user.service';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    LoginComponent
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
    StoreDevtoolsModule,
    FormsModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({}),
    RouterModule,
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([UserEffects]),
    HttpClientModule,
    MatSnackBarModule,
    MatTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import * as actions from '../../store/actions';
import { User } from '../../models/User';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectAllUsers } from 'app/store/reducers/users.reducer';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PageEvent, MatPaginator, MatSnackBar, Sort, MatSort, MatDialog } from '@angular/material';
import { fromMatSort, fromMatPaginator, sortRows, paginateRows } from '../../util/datasource-util';
import { FilterComponent } from '../filter/filter.component';
import { selectAllFilters } from 'app/store/reducers/filter.reducer';

@Component({
  selector: 'app-cv-overview',
  templateUrl: './cv-overview.component.html',
  styleUrls: ['./cv-overview.component.css']
})
export class CvOverviewComponent implements OnInit {
  public pageIndex: any;
  public pageSize: any;
  public pageSizeOptions: any;
  public userList: User[];

  displayedRows$: Observable<User[]>;
  totalRows$: Observable<number>;
  @ViewChild('paginator', null) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  private obs: any;

  public render: boolean;

  constructor(
    private store: Store<any>,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.pageIndex = 0;
    this.pageSize = 20;
    this.pageSizeOptions = [5, 10, 15, 20, 25, 100];
    const lStorage = JSON.parse(localStorage.getItem('CVBook-CurrentCompany'));

    this.obs = this.store.select(selectAllFilters).subscribe(filters => {
      this.store.select(selectAllUsers).subscribe(users => {
        if (filters.length === 0) {
          if (users.length !== 0) {
            if (users[0].userID === -1) {
              this.populateList([]);
              if (this.render === true) {
                this.snackBar.open(`Users with given criteria aren't in the database!`, 'Close', {
                  duration: 3000
                });
                this.render = false;
              }
            } else {
              this.render = true;
              this.populateList(users);
            }
          } else {
            this.store.dispatch(new actions.GetUsers(lStorage.kompanijaID));
          }
        } else {
          const cv = filters[0].cv;
          const favourite = filters[0].favourite;
          const firstName = filters[0].firstName;
          const lastName = filters[0].lastName;
          const yos = filters[0].yos;
          const grade = filters[0].grade;
          const faculty = filters[0].faculty;
          const permanentResidenceCity = filters[0].permanentResidenceCity;
          const permanentResidenceCountry = filters[0].permanentResidenceCountry;
          const temporaryResidenceCity = filters[0].temporaryResidenceCity;
          const temporaryResidenceCountry = filters[0].temporaryResidenceCountry;

          const payload = {
            id: 1,
            firstName,
            lastName,
            yos,
            grade,
            faculty,
            cv: cv === false ? '' : true,
            favourite: favourite === false ? '' : true,
            permanentResidenceCity,
            permanentResidenceCountry,
            temporaryResidenceCity,
            temporaryResidenceCountry,
            kompanijaID: lStorage.kompanijaID
          };
          if (users.length === 0) {
            this.store.dispatch(new actions.FilterUsers(payload));
          } else {
            this.populateList(users);
          }
        }
      });
    });
  }

  populateList(users) {
    setTimeout(() => {
      this.userList = users.userID === -1 ? [] : users;
      const sortEvents$: Observable<Sort> = fromMatSort(this.sort);
      const pageEvents$: Observable<PageEvent> = fromMatPaginator(this.paginator);
      const rows$ = of(this.userList);
      this.totalRows$ = rows$.pipe(map(rows => rows.length));
      this.displayedRows$ = rows$.pipe(sortRows(sortEvents$), paginateRows(pageEvents$));
    }, 100);
  }

  onReset() {
    const lStorage = JSON.parse(localStorage.getItem('CVBook-CurrentCompany'));
    this.store.dispatch(new actions.FilterUsersReset());
    this.store.dispatch(new actions.GetUsers(lStorage.kompanijaID));
  }

  onFilter(): void {
    const dialogRef = this.dialog.open(FilterComponent, {
      width: '75%'
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.obs.unsubscribe();
    });
  }

  syncPrimaryPaginator(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.paginator.page.emit(event);
  }

}

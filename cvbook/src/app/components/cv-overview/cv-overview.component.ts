import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import * as actions from '../../store/actions';
import { User } from '../../models/User';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectAllUsers } from 'app/store/reducers/users.reducer';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PageEvent, MatPaginator, MatSnackBar, Sort, MatSort, MatDialog} from '@angular/material';
import { fromMatSort, fromMatPaginator, sortRows, paginateRows } from '../../util/datasource-util';
import {FilterComponent } from '../filter/filter.component';

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
    this.store.dispatch(new actions.GetUsers({}));
    this.store.select(selectAllUsers).subscribe(users => {
      if (users.length !== 0) {
        if (users[0].userID === -1) {
          this.snackBar.open(`Users with given criteria aren't in the database!`, 'Close', {
            duration: 3000
          });
        } else {
          this.userList = users;
          if (this.sort !== undefined) {
            const sortEvents$: Observable<Sort> = fromMatSort(this.sort);
            const pageEvents$: Observable<PageEvent> = fromMatPaginator(this.paginator);
            const rows$ = of(this.userList);
            this.totalRows$ = rows$.pipe(map(rows => rows.length));
            this.displayedRows$ = rows$.pipe(sortRows(sortEvents$), paginateRows(pageEvents$));
          }
        }
      }
    });
  }

  onReturn() {
  }

  onFilter(): void {
    const dialogRef = this.dialog.open(FilterComponent, {
      width: '75%'
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  syncPrimaryPaginator(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.paginator.page.emit(event);
  }

}

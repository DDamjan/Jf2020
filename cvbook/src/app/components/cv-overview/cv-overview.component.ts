import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../service/user.service';
import * as actions from '../../store/actions';
import { User } from '../../models/User';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectAllUsers } from 'app/store/reducers/users.reducer';
import { Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { PageEvent, MatPaginator, MatSnackBar, Sort, MatSort } from '@angular/material';
import { fromMatSort, fromMatPaginator, sortRows, paginateRows } from './datasource-util';

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
  @ViewChild(MatSort, null) sort: MatSort;

  constructor(private store: Store<any>, private userService: UserService, private router: Router, private snackBar: MatSnackBar) { }

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
          const sortEvents$: Observable<Sort> = fromMatSort(this.sort);
          const pageEvents$: Observable<PageEvent> = fromMatPaginator(this.paginator);
          const rows$ = of(this.userList);
          this.totalRows$ = rows$.pipe(map(rows => rows.length));
          this.displayedRows$ = rows$.pipe(sortRows(sortEvents$), paginateRows(pageEvents$));
        }
      }
    });
  }
  onReturn() {
  }
}

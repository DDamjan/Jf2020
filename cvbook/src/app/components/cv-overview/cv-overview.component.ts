import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../service/user.service';
import * as actions from '../../store/actions';
import { User } from '../../models/User';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectAllUsers } from 'app/store/reducers/users.reducer';
import { Observable, of, concat, defer, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageEvent, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-cv-overview',
  templateUrl: './cv-overview.component.html',
  styleUrls: ['./cv-overview.component.css']
})
export class CvOverviewComponent implements OnInit {

  public userList: User[];

  displayedRows$: Observable<User[]>;
  totalRows$: Observable<number>;
  @ViewChild('paginator', null) paginator: MatPaginator;

  constructor(private store: Store<any>, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new actions.GetUsers({}));
    this.store.select(selectAllUsers).subscribe(users => {
      console.log('populateUserList');
      console.log(users);
      if (users.length !== 0) {
        this.userList = users;
        const pageEvents$: Observable<PageEvent> = this.fromMatPaginator(this.paginator);

        const rows$ = of(this.userList);
        this.totalRows$ = rows$.pipe(map(rows => rows.length));
        this.displayedRows$ = rows$.pipe(this.paginateRows(pageEvents$));
      }
    });
  }

  populateUserList() {
    console.log('populateUserList');
    // this.userService.getUsers({}).subscribe(users => {console.log('users'); console.log(users); this.userList = users; });
  }


  fromMatPaginator(pager: MatPaginator): Observable<PageEvent> {
    return concat(
      defer(() => of({
        pageIndex: pager.pageIndex,
        pageSize: pager.pageSize,
        length: pager.length,
      })),
      pager.page.asObservable()
    );
  }

  paginateRows<U>(page$: Observable<PageEvent>): (obs$: Observable<U[]>) => Observable<U[]> {
    return (rows$: Observable<U[]>) => combineLatest(
      rows$,
      page$,
      (rows, page) => {
        const startIndex = page.pageIndex * page.pageSize;
        const copy = rows.slice();
        return copy.splice(startIndex, page.pageSize);
      }
    );
  }

}

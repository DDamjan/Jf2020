import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import * as actions from '../../store/actions';
import { User } from '../../models/User';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectAllUsers } from 'app/store/reducers/users.reducer';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PageEvent, MatPaginator, MatSnackBar, Sort, MatSort } from '@angular/material';
import { fromMatSort, fromMatPaginator, sortRows, paginateRows } from '../../util/datasource-util';
import { CompanyService } from 'app/service/company.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  public pageIndex: any;
  public pageSize: any;
  public pageSizeOptions: any;
  public userList: User[];

  displayedRows$: Observable<User[]>;
  totalRows$: Observable<number>;
  @ViewChild('paginator', null) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private store: Store<any>, private router: Router, private snackBar: MatSnackBar, private companyService: CompanyService) { }

  ngOnInit() {
    this.pageIndex = 0;
    this.pageSize = 3;
    this.pageSizeOptions = [3, 5, 10, 15, 20, 25, 100];

    const lStorage = JSON.parse(localStorage.getItem('CVBook-CurrentCompany'));

    this.companyService.getHistory(lStorage.kompanijaID).subscribe(history => {
      // if (this.sort !== undefined) {
      // const sortEvents$: Observable<Sort> = fromMatSort(this.sort);
      const pageEvents$: Observable<PageEvent> = fromMatPaginator(this.paginator);
      const rows$ = of(history);
      this.totalRows$ = rows$.pipe(map(rows => rows.length));
      this.displayedRows$ = rows$.pipe(/*sortRows(sortEvents$),*/ paginateRows(pageEvents$));
      // }
    });


  }

  onReturn() {
  }

  syncPrimaryPaginator(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.paginator.page.emit(event);
  }
}

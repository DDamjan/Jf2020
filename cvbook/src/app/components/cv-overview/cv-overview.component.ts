import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import * as actions from '../../store/actions';
import { User } from '../../models/User';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectAllUsers } from 'app/store/reducers/users.reducer';

@Component({
  selector: 'app-cv-overview',
  templateUrl: './cv-overview.component.html',
  styleUrls: ['./cv-overview.component.css']
})
export class CvOverviewComponent implements OnInit {

  public userList: User[];

  constructor(private store: Store<any>, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new actions.GetUsers({}));
    this.store.select(selectAllUsers).subscribe(users => {
      console.log('populateUserList');
      console.log(users);
      if (users.length !== 0) {
        this.userList = users;
      }
    });
  }

  populateUserList() {
    console.log('populateUserList');
    // this.userService.getUsers({}).subscribe(users => {console.log('users'); console.log(users); this.userList = users; });
  }

}

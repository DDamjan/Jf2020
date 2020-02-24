import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../models/User';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cv-overview',
  templateUrl: './cv-overview.component.html',
  styleUrls: ['./cv-overview.component.css']
})
export class CvOverviewComponent implements OnInit {

  public userList: User[];

  constructor(private store: Store<any>, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUsers({}).subscribe(users => {console.log('users'); console.log(users); this.userList = users; });
  }

  populateUserList() {
    console.log('populateUserList');
    this.userService.getUsers({}).subscribe(users => {console.log('users'); console.log(users); this.userList = users; });
  }

}

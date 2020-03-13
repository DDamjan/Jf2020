import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
// import { UserService } from '../../service/user.service';
import * as actions from '../../store/actions';
import { selectAllUser } from 'app/store/reducers/user.reducer';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  public data: any;
  public isReady: boolean;
  constructor(
    private store: Store<any>,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.store.dispatch(new actions.GetUser(id));
    this.store.select(selectAllUser).subscribe(user => {
      if (user.length === 0) {
        // console.log('koj ID');
        // console.log(id);
        // console.log(user);
        // this.store.dispatch(new actions.GetUser(id));
        this.isReady = false;
      } else {
        // console.log('selectAllUser');
        // console.log(user);
        this.data = user[0];
        this.isReady = true;
      }
    });
  }
  // update() {
  //   this.ngOnInit();
  // }
}

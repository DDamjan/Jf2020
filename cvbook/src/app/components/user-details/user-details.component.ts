import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
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
  public isNewUserDetails: boolean;
  
  constructor(
    private store: Store<any>,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    this.isNewUserDetails = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new actions.GetUser(id));
    this.store.select(selectAllUser).subscribe(user => {
      if (user.length === 0) {
        this.isReady = false;
      } else {
        this.data = user[0];
        console.log(this.data);
        this.isReady = true;
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UserService } from '../../service/user.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  public error: boolean;
  constructor(private store: Store<any>, private userService: UserService) { this.error = false; }

  ngOnInit() {
  }

  onSubmit($event) {
    const firstName = $event.target[0].value;
    const lastName = $event.target[1].value;
    const username = $event.target[2].value;
    const password = $event.target[3].value;
    const passwordCheck = $event.target[4].value;

    const payload = {
      username,
      type: 'client'
    };

    this.userService.checkUsername(payload).subscribe(exist => {
      if (exist === false) {
        const user = {
          username,
          password,
          firstName,
          lastName,
          type: 'client',
          currentLocation: 'Trg Kralja Aleksandra Ujedinitelja'
        };
        // this.store.dispatch(new actions.RegisterUser(user));
      } else {
        this.error = true;
      }
    });

    // this.store.dispatch(new actions.AuthUser(payload));
  }

}

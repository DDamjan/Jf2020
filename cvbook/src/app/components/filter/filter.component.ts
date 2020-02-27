import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as actions from '../../store/actions';
import { UserService } from '../../service/user.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  public error: boolean;
  public cities: any;
  public counties: any;
  constructor(private store: Store<any>, private userService: UserService) { this.error = false; }

  ngOnInit() {
  }

  onSubmit($event) {
    const firstName = $event.target[0].value;
    const lastName = $event.target[1].value;
    const yearOfStudy = $event.target[2].value;
    const gradeAverage = $event.target[3].value;
    const graduated = $event.target[4].value;
    const hasCV = $event.target[5].value;
    const city = $event.target[6].value;
    const country = $event.target[7].value;

    const payload = {
      firstName,
      lastName,
      yearOfStudy,
      gradeAverage,
      graduated,
      hasCV,
      city,
      country
    };

    if (false === false) {
      this.store.dispatch(new actions.GetUsers(payload));
    } else {
      this.error = true;
    }
  }
}


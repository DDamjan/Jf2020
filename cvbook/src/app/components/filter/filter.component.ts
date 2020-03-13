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
    const cv = $event.target[1].checked;
    const firstName = $event.target[2].value;
    const lastName = $event.target[3].value;
    const yof = $event.target[4].value;
    const grade = $event.target[5].value;
    const faculty = $event.target[6].value;
    const permanentResidenceCity = $event.target[8].value;
    const permanentResidenceCountry = $event.target[9].value;
    const temporaryResidenceCity = $event.target[11].value;
    const temporaryResidenceCountry = $event.target[12].value;

    const payload = {
      firstName: firstName === undefined ? '' : firstName,
      lastName: lastName === undefined ? '' : lastName,
      yof: yof === undefined ? '' : yof,
      grade: grade === undefined ? '' : grade,
      faculty: faculty === undefined ? '' : faculty,
      cv: cv === false ? '' : true,
      permanentResidenceCity: permanentResidenceCity === undefined ? '' : permanentResidenceCity,
      permanentResidenceCountry: permanentResidenceCountry === undefined ? '' : permanentResidenceCountry,
      temporaryResidenceCity: temporaryResidenceCity === undefined ? '' : temporaryResidenceCity,
      temporaryResidenceCountry: temporaryResidenceCountry === undefined ? '' : temporaryResidenceCountry
    };

    // if (false === false) {
    //   this.store.dispatch(new actions.GetUsers(payload));
    // } else {
    //   this.error = true;
    // }

    console.log(payload);
  }
}


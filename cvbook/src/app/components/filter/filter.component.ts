import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as actions from '../../store/actions';
import { UserService } from '../../service/user.service';
import { CompanyService } from 'app/service/company.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  public error: boolean;
  public cities: any;
  public counties: any;
  private yosOptions: string[] = ['1', '2', '3', '4', '5', '6'];
  private countryOptions: string[] = [];
  private cityOptions: string[] = [];
  private facultyOptions: string[] = [];
  constructor(private store: Store<any>, private userService: UserService, private companyService: CompanyService) { this.error = false; }

  ngOnInit() {
    this.companyService.formOptions().subscribe(options => {
      options.drzave.forEach(drzava => {
        this.countryOptions.push(drzava.naziv);
      });
      options.gradovi.forEach(grad => {
        this.cityOptions.push(grad.naziv);
      });

      options.fakulteti.forEach(fakultet => {
        this.facultyOptions.push(fakultet.naziv);
      });
    });
  }

  onSubmit($event) {
    const cv = $event.target[1].checked;
    const firstName = $event.target[2].value;
    const lastName = $event.target[3].value;
    const yof = $event.target[4].value;
    const grade = $event.target[5].value;
    const faculty = $event.target[6].value;
    const permanentResidenceCity = $event.target[7].value;
    const permanentResidenceCountry = $event.target[8].value;
    const temporaryResidenceCity = $event.target[9].value;
    const temporaryResidenceCountry = $event.target[10].value;

    const payload = {
      firstName,
      lastName,
      yof,
      grade,
      faculty,
      cv: cv === false ? '' : true,
      permanentResidenceCity,
      permanentResidenceCountry,
      temporaryResidenceCity,
      temporaryResidenceCountry
    };

    // if (false === false) {
    //   this.store.dispatch(new actions.GetUsers(payload));
    // } else {
    //   this.error = true;
    // }

    this.store.dispatch(new actions.FilterUsers(payload));
  }


}

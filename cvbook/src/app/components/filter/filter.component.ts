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
  public yosOptions: string[] = ['1', '2', '3', '4', '5', '6'];
  public pCountryOptions: string[] = [];
  public pCityOptions: string[] = [];
  public tCountryOptions: string[] = [];
  public tCityOptions: string[] = [];
  public facultyOptions: string[] = [];
  constructor(private store: Store<any>, private userService: UserService, private companyService: CompanyService) { this.error = false; }

  ngOnInit() {
    this.populateformOptions();
  }

  populateformOptions() {
    this.companyService.formOptions().subscribe(options => {
      options.drzave.forEach(drzava => {
        this.pCountryOptions.push(drzava.naziv);
        this.tCountryOptions.push(drzava.naziv);
      });
      options.gradovi.forEach(grad => {
        this.pCityOptions.push(grad.naziv);
        this.tCityOptions.push(grad.naziv);
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
    const yos = $event.target[4].value;
    const grade = $event.target[5].value;
    const faculty = $event.target[6].value;
    const permanentResidenceCity = $event.target[7].value;
    const permanentResidenceCountry = $event.target[8].value;
    const temporaryResidenceCity = $event.target[9].value;
    const temporaryResidenceCountry = $event.target[10].value;

    const payload = {
      id: 1,
      firstName,
      lastName,
      yos,
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

  autoCompleteListener($event, type) {
    console.log($event);
    switch (type) {
      case 'faculty': {
        this.facultyOptions = this.facultyOptions.filter(f => f.toLowerCase().indexOf($event.target.value.toLowerCase()) === 0);
        break;
      }
      case 'pCity': {
        this.pCityOptions = this.pCityOptions.filter(f => f.toLowerCase().indexOf($event.target.value.toLowerCase()) === 0);
        break;
      }
      case 'pCountry': {
        this.pCountryOptions = this.pCountryOptions.filter(f => f.toLowerCase().indexOf($event.target.value.toLowerCase()) === 0);
        break;
      }
      case 'tCity': {
        this.tCityOptions = this.tCityOptions.filter(f => f.toLowerCase().indexOf($event.target.value.toLowerCase()) === 0);
        break;
      }
      case 'tCountry': {
        this.tCountryOptions = this.tCountryOptions.filter(f => f.toLowerCase().indexOf($event.target.value.toLowerCase()) === 0);
        break;
      }
    }
    if ($event.target.value.length === 0) {
      this.populateformOptions();
    }

  }

}

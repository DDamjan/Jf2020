import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '../../store/actions';
import { CompanyService } from 'app/service/company.service';
import { selectAllFilters } from 'app/store/reducers/filter.reducer';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}

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

  public cv: boolean;
  public firstName: string;
  public lastName: string;
  public yos: string;
  public grade: string;
  public faculty: string;
  public pCity: string;
  public pCountry: string;
  public tCity: string;
  public tCountry: string;

  constructor(
    private store: Store<any>,
    private companyService: CompanyService,
    public dialogRef: MatDialogRef<FilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { this.error = false; }

  ngOnInit() {
    this.populateformOptions();
    this.store.select(selectAllFilters).subscribe(filters => {
      if (filters.length !== 0) {
        this.firstName = filters[0].firstName;
        this.lastName = filters[0].lastName;
        this.yos = filters[0].yos;
        this.grade = filters[0].grade;
        this.faculty = filters[0].faculty;
        this.pCity = filters[0].permanentResidenceCity;
        this.pCountry = filters[0].permanentResidenceCountry;
        this.tCity = filters[0].temporaryResidenceCity;
        this.tCountry = filters[0].temporaryResidenceCountry;
        this.cv = filters[0].cv;
      }
    });
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
    const cv = $event.target[0].checked;
    const favourite = $event.target[1].checked;
    const firstName = $event.target[2].value;
    const lastName = $event.target[3].value;
    const yos = $event.target[4].value;
    const grade = $event.target[5].value;
    const faculty = $event.target[6].value;
    const permanentResidenceCity = $event.target[7].value;
    const permanentResidenceCountry = $event.target[8].value;
    const temporaryResidenceCity = $event.target[9].value;
    const temporaryResidenceCountry = $event.target[10].value;
    const lStorage = JSON.parse(localStorage.getItem('CVBook-CurrentCompany'));

    const payload = {
      id: 1,
      firstName,
      lastName,
      yos,
      grade,
      faculty,
      cv: cv === false ? '' : true,
      favourite: favourite === false ? '' : true,
      permanentResidenceCity,
      permanentResidenceCountry,
      temporaryResidenceCity,
      temporaryResidenceCountry,
      kompanijaID: lStorage.kompanijaID
    };
    this.store.dispatch(new actions.FilterUsers(payload));
    this.dialogRef.close();
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

  onCancel(): void {
    this.dialogRef.close();
  }
}

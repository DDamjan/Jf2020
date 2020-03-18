import { Component, OnInit, Inject, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '../../store/actions';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CompanyService } from 'app/service/company.service';
import { selectAllFilters } from 'app/store/reducers/filter.reducer';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { filter } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit, OnDestroy {
  public error: boolean;
  public cities: any;
  public counties: any;
  public yosOptions: string[] = ['1', '2', '3', '4', '5', '6'];
  public pCountryOptions: string[] = [];
  public pCityOptions: string[] = [];
  public tCountryOptions: string[] = [];
  public tCityOptions: string[] = [];
  public facultyOptions: string[] = [];

  public cvControl = new FormControl();
  public favouriteControl = new FormControl();
  public firstNameControl = new FormControl();
  public lastNameControl = new FormControl();
  public yosControl = new FormControl();
  public gradeControl = new FormControl();
  public facultyControl = new FormControl();
  public pCityControl = new FormControl();
  public pCountryControl = new FormControl();
  public tCityControl = new FormControl();
  public tCountryControl = new FormControl();

  private storeCall: any;

  public faculties: string[] = [];
  public selectable: boolean;
  public removable: boolean;
  public addOnBlur: boolean;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public filteredFaculties: Observable<string[]>;


  @ViewChild('facultyInput', {static: false}) facultyInput: ElementRef<HTMLInputElement>;
  @ViewChild('faculty', {static: false}) matAutocomplete: MatAutocomplete;
  constructor(
    private store: Store<any>,
    private companyService: CompanyService,
    public dialogRef: MatDialogRef<FilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,

  ) {
    this.error = false;
    // this.filteredFaculties = this.facultyControl.valueChanges.pipe(
    //   startWith(null),
    //   map((fruit: string | null) => fruit ? this._filter(fruit) : this.facultyOptions.slice()));
  }

  ngOnInit() {
    this.selectable = true;
    this.removable = true;
    this.addOnBlur = true;
    this.separatorKeysCodes = [ENTER, COMMA];

    this.populateformOptions();
    this.storeCall = this.store.select(selectAllFilters).subscribe(filters => {
      if (filters.length !== 0) {
        this.cvControl.setValue(filters[0].cv);
        this.favouriteControl.setValue(filters[0].favourite);
        this.firstNameControl.setValue(filters[0].firstName);
        this.lastNameControl.setValue(filters[0].lastName);
        this.yosControl.setValue(filters[0].yos);
        this.gradeControl.setValue(filters[0].grade);
        this.facultyControl.setValue(filters[0].faculty);
        this.pCityControl.setValue(filters[0].permanentResidenceCity);
        this.pCountryControl.setValue(filters[0].permanentResidenceCountry);
        this.tCityControl.setValue(filters[0].temporaryResidenceCity);
        this.tCountryControl.setValue(filters[0].temporaryResidenceCountry);
      }
    });
  }

  populateformOptions() {
    console.log('populateformOptions');
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
  ngOnDestroy() {
    this.storeCall.unsubscribe();
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

    console.log(this.facultyControl);
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
    console.log(payload);
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

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.faculties.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.facultyControl.setValue(null);
    }
  }

  remove(faculty: string): void {
    const index = this.faculties.indexOf(faculty);

    if (index >= 0) {
      this.faculties.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.faculties.push(event.option.viewValue);
    this.facultyInput.nativeElement.value = '';
    this.facultyControl.setValue(null);
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.facultyOptions.filter(faculty => faculty.toLowerCase().indexOf(filterValue) === 0);
  // }

  onCancel(): void {
    this.dialogRef.close();
  }
}

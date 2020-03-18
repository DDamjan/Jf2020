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

  public selectable: boolean;
  public removable: boolean;
  public addOnBlur: boolean;
  public separatorKeysCodes: number[] = [ENTER, COMMA];

  public faculties: string[] = [];
  public pcities: string[] = [];
  public tcities: string[] = [];
  public pcountries: string[] = [];
  public tcountries: string[] = [];


  @ViewChild('facultyInput', {static: false}) facultyInput: ElementRef<HTMLInputElement>;
  @ViewChild('pCityInput', {static: false}) pCityInput: ElementRef<HTMLInputElement>;
  @ViewChild('tCityInput', {static: false}) tCityInput: ElementRef<HTMLInputElement>;
  @ViewChild('pCountryInput', {static: false}) pCountryInput: ElementRef<HTMLInputElement>;
  @ViewChild('tCountryInput', {static: false}) tCountryInput: ElementRef<HTMLInputElement>;

  @ViewChild('faculty', {static: false}) facultyMatAutocomplete: MatAutocomplete;
  @ViewChild('pCity', {static: false}) pCityMatAutocomplete: MatAutocomplete;
  @ViewChild('tCity', {static: false}) tCityMatAutocomplete: MatAutocomplete;
  @ViewChild('pCountry', {static: false}) pCountryMatAutocomplete: MatAutocomplete;
  @ViewChild('tCountry', {static: false}) tCountryMatAutocomplete: MatAutocomplete;
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
    console.log(this.faculties);
    console.log(this.pcities);
    console.log(this.tcities);
    console.log(this.pcountries);
    console.log(this.tcountries);
    // CONSOLE LOGOVAO SAM TI SVE DA ODAVDE UZIMAS PODATKE
    // I POPUNJAVA IH SVE SAVRSENO
    // MENE JE MRZELO A VERUJEM DA CE I TEBE DA SE NAPRAVI KOMPONENTA ZA INPUT FIELD
    // SA SVOJIM ULAZNIM I IZLAZNIM FUNKCIJAMA UMESTO DA SE OVOLIKO KOPIRA KOD

    // ono sto ne radi ne pamte se cipsevi izmedju searchovanja

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
    console.log(payload);
    this.store.dispatch(new actions.FilterUsers(payload));
    this.dialogRef.close();
  }

  autoCompleteListener($event, type: string) {
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

  add(event: MatChipInputEvent, type: string): void {
    switch (type) {
      case 'faculty': {
        this.addFunction(event, this.facultyMatAutocomplete, this.faculties, this.facultyControl);
        break;
      }
      case 'pCity': {
        this.addFunction(event, this.pCityMatAutocomplete, this.pcities, this.pCityControl);
        break;
      }
      case 'pCountry': {
        this.addFunction(event, this.pCountryMatAutocomplete, this.pcountries, this.pCountryControl);
        break;
      }
      case 'tCity': {
        this.addFunction(event, this.tCityMatAutocomplete, this.tcities, this.tCityControl);
        break;
      }
      case 'tCountry': {
        this.addFunction(event, this.tCountryMatAutocomplete, this.tcountries, this.tCountryControl);
        break;
      }
    }
  }

  addFunction(event: MatChipInputEvent, matAutocom: any, list: any, control: any) {
    if (!matAutocom.isOpen) {
      const input = event.input;
      const value = event.value;
      if ((value || '').trim()) { list.push(value.trim()); }
      if (input) { input.value = ''; }
      control.setValue(null);
    }
  }

  remove(data: string, type: string): void {
    switch (type) {
      case 'faculty': {
        this.removeFunction(data, this.faculties); break;
      }
      case 'pCity': {
        this.removeFunction(data, this.pcities); break;
      }
      case 'pCountry': {
        this.removeFunction(data, this.pcountries); break;
      }
      case 'tCity': {
        this.removeFunction(data, this.tcities); break;
      }
      case 'tCountry': {
        this.removeFunction(data, this.tcountries); break;
      }
    }
  }

  removeFunction(data: any, list: any) {
    const index = list.indexOf(data);
    if (index >= 0) { list.splice(index, 1); }
  }

  selected(event: MatAutocompleteSelectedEvent, type: string): void {
    switch (type) {
      case 'faculty': {
        this.selectedFunction(event, this.faculties, this.facultyInput, this.facultyControl);
        break;
      }
      case 'pCity': {
        this.selectedFunction(event, this.pcities, this.pCityInput, this.pCityControl);
        break;
      }
      case 'pCountry': {
        this.selectedFunction(event, this.pcountries, this.pCountryInput, this.pCountryControl);
        break;
      }
      case 'tCity': {
        this.selectedFunction(event, this.tcities, this.tCityInput, this.tCityControl);
        break;
      }
      case 'tCountry': {
        this.selectedFunction(event, this.tcountries, this.tCountryInput, this.tCountryControl);
        break;
      }
    }
  }

  selectedFunction(event: MatAutocompleteSelectedEvent, list: any, input: any, control: any) {
    list.push(event.option.viewValue);
    input.nativeElement.value = '';
    control.setValue(null);
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.facultyOptions.filter(faculty => faculty.toLowerCase().indexOf(filterValue) === 0);
  // }

  onCancel(): void {
    this.dialogRef.close();
  }
}

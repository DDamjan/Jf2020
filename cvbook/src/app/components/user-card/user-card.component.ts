import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() public type: any;
  @Input() public title: any;
  @Input() public data: any;
  public isPersonalData: boolean;
  public isResidence: boolean;
  public isPermanentResidence: boolean;
  public isHighSchoolEducation: boolean;
  public isHigherEducation: boolean;

  constructor(private store: Store<any>, private router: Router) { }

  ngOnInit() {
    this.isPersonalData = this.type === 'personalData';
    this.isResidence = this.type === 'residence';
    this.isPermanentResidence  = this.type === 'permanentResidence';
    this.isHighSchoolEducation = this.type === 'highSchoolEducation';
    this.isHigherEducation = this.type === 'higherEducation';
  }

  onclick() {
    // this.router.navigateByUrl(`operator/details/${this.driver.id}`);
  }
}

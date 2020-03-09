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
  public isData: boolean;

  constructor(private store: Store<any>, private router: Router) { }

  ngOnInit() {
    console.log(this.data);
    // console.log(this.type);
    this.isData = this.type === 'data';
  }

  onclick() {
    // this.router.navigateByUrl(`operator/details/${this.driver.id}`);
  }
}

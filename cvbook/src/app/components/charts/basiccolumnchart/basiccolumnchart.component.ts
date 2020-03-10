import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-basiccolumnchart',
  templateUrl: './basiccolumnchart.component.html',
  styleUrls: ['./basiccolumnchart.component.css']
})
export class BasicColumnChartComponent implements OnInit {
  // @Input() public type: any;
  @Input() public titleText: any;
  @Input() public dataPoints: any;
  constructor() { }

    ngOnInit() {
  }
}

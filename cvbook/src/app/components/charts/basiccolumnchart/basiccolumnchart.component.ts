import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../canvasjs.min';

@Component({
  selector: 'app-basiccolumnchart',
  templateUrl: './basiccolumnchart.component.html',
  styleUrls: ['./basiccolumnchart.component.css']
})
export class BasicColumnChartComponent implements OnInit {

  constructor() { }

    ngOnInit() {
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Basic Column Chart in Angular'
      },
      data: [{
        type: 'column',
        dataPoints: [
          { y: 71, label: 'Apple' },
          { y: 55, label: 'Mango' },
          { y: 50, label: 'Orange' },
          { y: 65, label: 'Banana' },
          { y: 95, label: 'Pineapple' },
          { y: 68, label: 'Pears' },
          { y: 28, label: 'Grapes' },
          { y: 34, label: 'Lychee' },
          { y: 14, label: 'Jackfruit' }
        ]
      }]
    });
    chart.render();
  }
}

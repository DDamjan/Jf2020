import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-basiccolumnchart',
  templateUrl: './basiccolumnchart.component.html',
  styleUrls: ['./basiccolumnchart.component.css']
})
export class BasicColumnChartComponent implements OnInit {
  @Input() public barChartData: ChartDataSets[];
  @Input() public barChartLabels: Label[];
  public chartReady: boolean;

  private backgroundColor: any =
  ['#1E9BED', '#0596F4', '#0172BC', '#01578F', '#195C87', '#074F7E', '#01436E', '#053A5C', '#053A5C', '#022A45'];
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartColors = [
    {
      backgroundColor: this.backgroundColor,
    },
  ];
  constructor() { }

  ngOnInit() {
    this.chartReady = true;
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}

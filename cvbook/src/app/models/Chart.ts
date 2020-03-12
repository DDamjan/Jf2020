import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

export interface Chart {
    chartID?: number;
    labels?: Label[];
    data?: ChartDataSets[];
}

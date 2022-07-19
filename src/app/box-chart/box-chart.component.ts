import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more'

HighchartsMore(Highcharts);

@Component({
  selector: 'app-box-chart',
  templateUrl: './box-chart.component.html',
  styleUrls: ['./box-chart.component.css']
})
export class BoxChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart';
  chartOptions: Highcharts.Options = {
    title: {
      text: 'Pokemon Type Distribution'
    },
    chart: {
      type: 'boxplot'
    },
    series: [{
      data: [
        [760, 801, 848, 895, 965],
        [733, 853, 939, 980, 1080],
        [714, 762, 817, 870, 918],
        [724, 802, 806, 871, 950],
        [834, 836, 864, 882, 910]
      ],
      tooltip: {
        headerFormat: '<em>Experiment No {point.key}</em><br/>'
      },
      type: 'boxplot'
    }],
    xAxis: {
      categories: ['1', '2', '3', '4', '5'],
      title: {
        text: 'Experiment No.'
      }
    },
    plotOptions: {
    },
    credits: {
      enabled: false
    }
  }; // required
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) {
    console.log("Hello", chart);
  } // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false

  constructor() { }

  ngOnInit(): void {
  }

}

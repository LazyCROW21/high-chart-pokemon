import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart';
  chartOptions: Highcharts.Options = {
    title: {
      text: 'Stats for Type'
    },
    chart: {
      type: 'bar'
    },
    xAxis: {
      categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
      title: {
        text: null
      }
    },
    series: [{
      name: 'Avg',
      data: [
        ['E', 1],
        ['B', 4],
        ['C', 2],
      ],
      type: 'bar'
    }],
    plotOptions: {
      bar: {
        dataLabels: { enabled: true }
      }
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

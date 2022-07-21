import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more'
import { Subscription } from 'rxjs';
import { ChartService } from '../chart-service/chart.service';

HighchartsMore(Highcharts);

@Component({
  selector: 'app-box-chart',
  templateUrl: './box-chart.component.html',
  styleUrls: ['./box-chart.component.css']
})
export class BoxChartComponent implements OnInit {
  pokemonTypeSub: Subscription;
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
      name: 'Type 1',
      data: [
        [760, 801, 848, 895, 965],
        [733, 853, 939, 980, 1080],
        [714, 762, 817, 870, 918],
        [724, 802, 806, 871, 950],
        [834, 836, 864, 882, 910],
        [834, 836, 864, 882, 910]
      ],
      tooltip: {
        headerFormat: '<em>{point.key}</em><br/>'
      },
      type: 'boxplot'
    }],
    xAxis: {
      categories: ['HP', 'ATK', 'DEF', 'SP. ATK', 'SP. DEF', 'SPD'],
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
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false

  constructor(private chartService: ChartService) {
    this.pokemonTypeSub = this.chartService.selectedTypes.subscribe((data: any) => {
      this.chartOptions = this.chartService.getTypeCompareBoxChart();
    });
  }

  ngOnInit(): void {
    this.chartOptions = this.chartService.getTypeCompareBoxChart();
  }

  ngOnDestroy(): void {
    this.pokemonTypeSub.unsubscribe();
  }
}

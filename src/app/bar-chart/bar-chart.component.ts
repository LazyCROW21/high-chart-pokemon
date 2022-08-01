import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Subscription } from 'rxjs';
import { ChartService } from '../chart-service/chart.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, OnDestroy {
  pokemon1Sub: Subscription;
  pokemon2Sub: Subscription;

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
      categories: ['HP', 'ATK', 'DEF', 'SP. ATK', 'SP. DEF', 'SPD'],
      title: {
        text: null
      }
    },
    series: [
      {
        name: 'Pokemon 1',
        data: [
          ['HP', 1],
          ['ATK', 4],
          ['DEF', 2],
          ['SP. ATK', 2],
          ['SP. DEF', 2],
          ['SPD', 2],
        ],
        type: 'bar'
      },
      {
        name: 'Pokemon 2',
        data: [
          ['HP', 1],
          ['ATK', 4],
          ['DEF', 2],
          ['SP. ATK', 2],
          ['SP. DEF', 2],
          ['SPD', 2],
        ],
        type: 'bar'
      }
    ],
    plotOptions: {
      bar: {
        dataLabels: { enabled: true }
      }
    },
    credits: {
      enabled: false
    }
  }; // required
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false

  constructor(private chartService: ChartService) {
    this.pokemon1Sub = chartService.selectedPokemons.subscribe((pokemons) => {
      this.chartOptions = this.chartService.getComparePokemonData();
    });
    this.pokemon2Sub = chartService.selectedPokemons.subscribe((pokemons) => {
      this.chartOptions = this.chartService.getComparePokemonData();
    });
  }
  
  ngOnInit(): void {
    this.chartOptions = this.chartService.getComparePokemonData();
  }

  ngOnDestroy(): void {
    this.pokemon1Sub.unsubscribe();
    this.pokemon2Sub.unsubscribe();
  }

}

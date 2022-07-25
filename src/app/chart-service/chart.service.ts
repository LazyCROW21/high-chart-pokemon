import { Injectable } from '@angular/core';
import Highcharts, { PointClickEventObject } from 'highcharts';
import { BehaviorSubject } from 'rxjs';

import POKEMON_DATA from '../../assets/POKEMON_DATA.json';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  typeColors: any = {
    'Fire': '#ff2a04',
    'Grass': '#66cd00',
    'Normal': '#cdc8b1',
    'Flying': '#d891ef',
    'Psychic': '#ff55a3',
    'Water': '#318ce7',
    'Bug': '#87a96b',
    'Rock': '#8b7355',
    'Electric': '#ffdf00',
    'Ghost': '#473c8b',
    'Ice': '#8deeee',
    'Dark': '#592720',
    'Fighting': '#b31b1b',
    'Dragon': '#9932cc',
    'Poison': '#9400d3',
    'Steel': '#a8a8a8',
    'Ground': '#cdc673',
    'Fairy': '#ffaeb9',
  }

  selectedPokemon1 = new BehaviorSubject<number>(3);
  selectedPokemon2 = new BehaviorSubject<number>(6);

  selectedTypes = new BehaviorSubject<Set<string>>(new Set<string>(['Fire', 'Grass']));

  constructor() { }

  changeSelectedPokemon(p1: number, p2: number) {
    this.selectedPokemon1.next(p1);
    this.selectedPokemon2.next(p2);
  }

  getPokemonById(index: number) {
    return POKEMON_DATA.find(pokemom => pokemom['#'] === index);
  }

  getAllPokemons() {
    return POKEMON_DATA.slice();
  }

  getTypeCompareBoxChart() {
    const allPokemons = this.getAllPokemons();
    const pokemonContainer: any = {};
    allPokemons.forEach((pokemon) => {
      this.selectedTypes.value.forEach((t) => {
        if (pokemon["Type 1"] === t || pokemon["Type 2"] === t) {
          if (pokemonContainer[t]) {
            pokemonContainer[t]['HP'].push(pokemon.HP);
            pokemonContainer[t]['ATK'].push(pokemon.Attack);
            pokemonContainer[t]['DEF'].push(pokemon.Defense);
            pokemonContainer[t]['SP. ATK'].push(pokemon['Sp. Atk']);
            pokemonContainer[t]['SP. DEF'].push(pokemon['Sp. Def']);
            pokemonContainer[t]['SPD'].push(pokemon.Speed);
          } else {
            pokemonContainer[t] = {};
            pokemonContainer[t]['HP'] = [pokemon.HP];
            pokemonContainer[t]['ATK'] = [pokemon.Attack];
            pokemonContainer[t]['DEF'] = [pokemon.Defense];
            pokemonContainer[t]['SP. ATK'] = [pokemon['Sp. Atk']];
            pokemonContainer[t]['SP. DEF'] = [pokemon['Sp. Def']];
            pokemonContainer[t]['SPD'] = [pokemon.Speed];
          }
        }
      });
    });

    const seriesData: any[] = [];
    const pokemonAttr = ['HP', 'ATK', 'DEF', 'SP. ATK', 'SP. DEF', 'SPD'];

    this.selectedTypes.value.forEach((t) => {
      pokemonAttr.forEach((attr) => {
        pokemonContainer[t][attr].sort((a: number, b: number) => a - b);
      });
      const min = 0;
      const lq = Math.floor(pokemonContainer[t]['HP'].length * 0.25);
      const median = Math.floor(pokemonContainer[t]['HP'].length * 0.5);
      const uq = Math.floor(pokemonContainer[t]['HP'].length * 0.75);
      const max = pokemonContainer[t]['HP'].length - 1;
      const typeData: any[] = [];
      pokemonAttr.forEach((attr) => {
        typeData.push([
          pokemonContainer[t][attr][min],
          pokemonContainer[t][attr][lq],
          pokemonContainer[t][attr][median],
          pokemonContainer[t][attr][uq],
          pokemonContainer[t][attr][max]
        ]);
      });
      seriesData.push(<Highcharts.SeriesOptionsType>{
        name: t,
        data: typeData,
        tooltip: {
          headerFormat: '<em>{point.key}</em><br/>'
        },
        color: this.typeColors[t],
        type: 'boxplot'
      })
    });

    return <Highcharts.Options>{
      title: {
        text: 'Pokemon Type Stats Distribution'
      },
      chart: {
        type: 'boxplot'
      },
      series: seriesData,
      xAxis: {
        categories: ['HP', 'ATK', 'DEF', 'SP. ATK', 'SP. DEF', 'SPD'],
        title: {
          text: null
        }
      },
      plotOptions: {
      },
      credits: {
        enabled: false
      }
    };
  }

  getTypeChart() {
    const selectedPokemonTypes = this.selectedTypes.value;
    const allPokemons = this.getAllPokemons();
    const pie: any = {};
    allPokemons.forEach((pokemon) => {
      if (pie.hasOwnProperty(pokemon['Type 1'])) {
        pie[pokemon['Type 1']]++;
      } else {
        pie[pokemon['Type 1']] = 1;
      }
      if (pie.hasOwnProperty(pokemon['Type 2'])) {
        pie[pokemon['Type 2']]++;
      } else {
        pie[pokemon['Type 2']] = 1;
      }
    });
    const pieData = [];
    const keys = Object.getOwnPropertyNames(pie);
    const theService = this;
    for (let k of keys) {
      if (k) {
        pieData.push(<Highcharts.PointOptionsObject>{
          name: k,
          color: this.typeColors[k],
          y: pie[k],
          id: k,
          sliced: selectedPokemonTypes.has(k),
          events: {
            click: function (event: any) {
              event.preventDefault();
              const chkPKMONType = theService.selectedTypes.value;
              if (chkPKMONType.has(event.point.id)) {
                this.sliced = false;
                chkPKMONType.delete(event.point.id);
              } else {
                this.sliced = true;
                chkPKMONType.add(event.point.id);
              }
              this.update(this, true);
              theService.selectedTypes.next(chkPKMONType);
            }
          }
        });
      }
    }
    return <Highcharts.Options>{
      title: {
        text: 'Pokemon Type Distribution'
      },
      chart: {
        type: 'pie'
      },
      series: [{
        name: 'Count',
        data: pieData,
        type: 'pie',
      }],
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      credits: {
        enabled: false
      }
    };
  }

  getComparePokemonData() {
    const pokemon1 = this.getPokemonById(this.selectedPokemon1.value);
    const pokemon2 = this.getPokemonById(this.selectedPokemon2.value);
    return <Highcharts.Options>{
      title: {
        text: `${pokemon1?.Name} v/s ${pokemon2?.Name}`
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
      yAxis: {
        title: {
          text: 'Base Stats'
        }
      },
      series: [
        {
          name: pokemon1?.Name,
          data: [
            ['HP', pokemon1?.['HP']],
            ['ATK', pokemon1?.['Attack']],
            ['DEF', pokemon1?.['Defense']],
            ['SP. ATK', pokemon1?.['Sp. Atk']],
            ['SP. DEF', pokemon1?.['Sp. Def']],
            ['SPD', pokemon1?.['Speed']]
          ],
          type: 'bar'
        },
        {
          name: pokemon2?.Name,
          data: [
            ['HP', pokemon2?.['HP']],
            ['ATK', pokemon2?.['Attack']],
            ['DEF', pokemon2?.['Defense']],
            ['SP. ATK', pokemon2?.['Sp. Atk']],
            ['SP. DEF', pokemon2?.['Sp. Def']],
            ['SPD', pokemon2?.['Speed']]
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
    };
  }
}

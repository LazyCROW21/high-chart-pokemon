import { Component } from '@angular/core';
import { ChartService } from './chart-service/chart.service';

import { Option } from './common/common.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'high-chart-pokemon';
  selectedPokemon1: number = 3;
  selectedPokemon2: number = 6;
  pokemonOptions: Option[] = [];

  constructor(private chartService: ChartService) {
    const allPokemons = this.chartService.getAllPokemons();
    this.pokemonOptions;
    allPokemons.forEach((pokemon) => {
      this.pokemonOptions.push({
        label: pokemon.Name,
        value: pokemon['#']
      });
    });
  }

  pokemonSelect(pokemon: number, event: number) {
    if(pokemon === 1) {
      this.selectedPokemon1 = event;
    } else {
      this.selectedPokemon2 = event;
    }
    this.chartService.changeSelectedPokemon(this.selectedPokemon1, this.selectedPokemon2);
  }

}

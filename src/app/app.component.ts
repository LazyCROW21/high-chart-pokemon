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
  // selected pokemon value on left side dropdown
  selectedPokemon1: number = 3;

  // selected pokemon value on right side dropdown
  selectedPokemon2: number = 6;

  // option array for dropdown [list of all pokemon]
  pokemonOptions: Option[] = [];

  constructor(private chartService: ChartService) {
    const allPokemons = this.chartService.getAllPokemons();
    this.pokemonOptions;
    /* 
      option only label [Pokemon's Name] & value [Pokemon's #].
    */
    allPokemons.forEach((pokemon) => {
      this.pokemonOptions.push({
        label: pokemon.Name,
        value: pokemon['#']
      });
    });
  }

  // called when the dropdown list triggers a change event
  pokemonSelect(pokemon: number, event: number) {
    if(pokemon === 1) {
      this.selectedPokemon1 = event;
    } else {
      this.selectedPokemon2 = event;
    }
    // informing the service of the changed selected pokemons.
    this.chartService.changeSelectedPokemon(this.selectedPokemon1, this.selectedPokemon2);
  }

}

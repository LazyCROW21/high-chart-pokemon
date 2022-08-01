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

  selectedPokemons: number[] = [3, 6];

  // option array for dropdown [list of all pokemon]
  pokemonOptions: Option[] = [];

  constructor(public chartService: ChartService) {
    const allPokemons = this.chartService.getAllPokemons();
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
  onPokemonSelect(spIdx: number, pokemon: number) {
    // informing the service of the changed selected pokemons.
    this.chartService.unselectPokemon(this.selectedPokemons[spIdx]);
    this.selectedPokemons[spIdx] = pokemon;
    this.chartService.selectPokemon(pokemon);
  }

  onUnSelectPokemon(spIdx: number) {
    this.chartService.unselectPokemon(this.selectedPokemons[spIdx]);
    this.selectedPokemons.splice(spIdx, 1);
  }

  addPokemon() {
    const newPokemon = this.chartService.getAllPokemons().find((pokemon) => !this.chartService.selectedPokemons.value.has(pokemon['#']));
    this.chartService.selectPokemon(newPokemon ? newPokemon?.['#'] : 0);
    this.selectedPokemons.push(newPokemon ? newPokemon?.['#'] : 0);
  }
}

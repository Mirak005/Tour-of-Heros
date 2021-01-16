import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
// import { MessageService } from '../message.service';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css'],
})
export class HerosComponent implements OnInit {
  heros: Hero[];
  // selectedHero: Hero;
  constructor(
    private heroService: HeroService // private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getHeros();
  }

  //getHeros
  getHeros(): void {
    this.heroService.getHeros().subscribe((heros) => (this.heros = heros));
  }

  //add Hero
  add(name: string): void {
    name = name.trim();
    if (!name) {
      return window.alert('Please enter a valid Hero Name');
    }
    this.heroService
      .addHero({ name } as Hero)
      .subscribe((hero) => this.heros.unshift(hero));
  }
  //Remove Hero
  removeHero(hero: Hero) {
    this.heroService.removeHero(hero).subscribe(() => {
      this.heros = this.heros.filter((h) => h.id !== hero.id);
    });
  }

  //select method
  // onSelect(hero: Hero) {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }
}

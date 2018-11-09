import { Component, OnInit } from '@angular/core';
import { Animal } from '../animal';
import { AnimalService } from '../animal.service';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {

  animals: Animal[];
  selectedAnimal: Animal;

  constructor(private animalService: AnimalService) { }

  ngOnInit() {
    this.getAnimals();
  }

  getAnimals(): void {
    this.animals = this.animalService.getAnimals();
  }

  onSelect(animal: Animal): void {
    this.selectedAnimal = animal;
  }
}

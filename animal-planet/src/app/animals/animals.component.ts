import { Component, OnInit } from '@angular/core';
import { Animal } from '../animal';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {

  animals: Animal[] = [
    {id: 1, name: 'sammy', type: 'cat'},
    {id: 2, name: '細阿妹', type: 'cat'},
    {id: 3, name: '肥不點', type: 'cat'},
    {id: 4, name: '妞妞', type: 'dog'},
    {id: 5, name: 'money', type: 'dog'},
  ];
  selectedAnimal: Animal;

  constructor() { }

  ngOnInit() {
  }

  onSelect(animal: Animal): void {
    this.selectedAnimal = animal;
  }
}

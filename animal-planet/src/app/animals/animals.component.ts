import { Component, OnInit } from '@angular/core';
import { Animal } from '../animal';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {

  animal: Animal = {
    id: 1,
    name: 'sammy',
    type: 'cat'
  };
  constructor() { }

  ngOnInit() {
  }

}

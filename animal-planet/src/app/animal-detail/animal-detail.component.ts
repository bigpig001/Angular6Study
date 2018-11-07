import { Component, OnInit, Input } from '@angular/core';
import { Animal } from '../animal';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.css']
})
export class AnimalDetailComponent implements OnInit {

  @Input() animal: Animal;

  constructor() { }

  ngOnInit() {
  }

}

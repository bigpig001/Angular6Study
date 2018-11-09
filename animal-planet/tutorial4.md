# 服務
第四個練習我們要建立服務，並將前面的animal component封裝成一個服務元件

首先建立一個AnimalService
```sh
$ ng g s animal -m app
```

接者我們先將在`animals.component.ts` 裡面的animals 模擬資料獨立出來放在`\app\mock-animals.ts`內

```ts
import { Animal } from './animal';

export const ANIMALS: Animal[] = [
  { id: 1, name: 'sammy', type: 'cat' },
  { id: 2, name: '細阿妹', type: 'cat' },
  { id: 3, name: '肥不點', type: 'cat' },
  { id: 4, name: '妞妞', type: 'dog' },
  { id: 5, name: 'money', type: 'dog' },
];
```

`animal.service.ts`一開始建立系統會自動幫我們輸入好內容

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor() { }

}

```
接著多import animal類別及剛剛新增的模擬資料
```ts
import { Animal } from './animal';
import { ANIMALS } from './mock-animals';
```

在export 類別加上一個回傳Animals資料的方法`getAnimals`

```ts
  getAnimals(): Animal[] {
    return ANIMALS;
  }
```

再來我們回到`animals.component.ts` 將原本的方式改成呼叫AniamlService取得資料。

```ts
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

```


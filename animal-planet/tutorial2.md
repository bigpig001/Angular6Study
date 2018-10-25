# The Animal
第二個練習我們要建立新的component來顯示動物的資料<br/>

```sh
$ ng generate component animals
CREATE src/app/animals/animals.component.css (0 bytes)
CREATE src/app/animals/animals.component.html (26 bytes)
CREATE src/app/animals/animals.component.spec.ts (635 bytes)
CREATE src/app/animals/animals.component.ts (273 bytes)
UPDATE src/app/app.module.ts (479 bytes)
```
`ng g c animals` 縮寫指令有一樣的效果。這邊會看到它自動幫你把animals component相關的檔案都建置起來，也將`app.module.ts`更新了，import自動加上`import { AnimalsComponent } from './animals/animals.component';`及declarations宣告多了`AnimalsComponent`

# 來隻貓吧

首先我們在`animals.component.ts` export的部分加上`animal = 'Cat'`

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {

  animal = 'cat';
  constructor() { }

  ngOnInit() {
  }

}
```

再來將`animals.component.html`秀出變數`animal`

```html
<div class="animals"> {{ animal }} </div>
```

`animals.component.css`給他一點顏色

```css
.animals {
  color: rgb(149, 167, 49);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 250%;
}
```

接著我們再回到`app.component.html`將`<app-animals></app-animals>`添加在喜歡的地方

```html
<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>

  <app-animals></app-animals>
</div>


<router-outlet></router-outlet>
```
登勒～我們就會看到畫面變成
<img src='../img/tutorial2_1.png' height='246px' >

# 建立動物類別
動物有很多種啊!!所以我們先在`src/app/`底下建立一個動物類別`animal.ts`

```ts
export class Animal {
  id: number;
  name: string;
  type: string;
}
```
接著我們回到`animals.component.ts`將這個類別import進來,

```ts
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
```

因為我們已經將animal這個變數改成Animal的類別，所以`animals.component.html` template的部分也要稍作修改。
`{{ animal.name| uppercase}}` | 後是代表格式，我們要他這格顯示大寫。

```html
<div class="animals">
  <h2> {{ animal.name| uppercase}}'s Details</h2>
  <div><span>id: </span>{{animal.id}}</div>
  <div><span>name: </span>{{animal.name}}</div>
  <div><span>type: </span>{{animal.type}}</div>
</div>
```

這樣我們應該可以看到畫面變成
<img src='../img/tutorial2_2.png' height='246px'>

## 列表
葉問曾經說過，我要打10個！  
貓～我們也要養10個！！  

我們先回到`animals.component.ts`。將原本`animal`變數改為陣列，接著宣告一個`selectedAnimal`變數是`Animal`類別，底下加上一個點選事件`onSelect`。

```js
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
```

再來我們將原本`animals.component.html`也稍做修改如下。

```html
<h2> Animals</h2>
<ul class="animals">
  <li *ngFor="let animal of animals"
      [class.selected]="animal === selectedAnimal"
      (click)="onSelect(animal)">
    <span>{{animal.id}}</span> {{animal.name | uppercase}}
  </li>
</ul>
<div *ngIf="selectedAnimal">
  <h2> {{ selectedAnimal.name | uppercase}}'s Details</h2>
  <div><span>id: </span>{{selectedAnimal.id}}</div>
  <div><span>name: </span>{{selectedAnimal.name}}</div>
  <div><span>type: </span>{{selectedAnimal.type }}</div>
</div>

```
- `*ngFor=let animal of animals`:  
代表宣告這個li元素會由Angular迴圈產生，而內容變數會從`animals`陣列取1並命名成`animal`填入
- `[class.CSS類別名] = "條件式"`:  
當資料符合條件式時，會加上設定的CSS類別
- `(click)="onSelect(animal)`:  
點擊時會觸發`onSelect`事件，並將該li所綁定的`animal`變數傳入
- `*ngIf="條件式"`:  
當條件符合時，該div才會顯示

接著css我們也做一些修改。

所以在這頁會先呈現動物的列表，點選其中一個會觸發點選事件，將值傳入顯示在下方，呈現結果如下。
<img src='../img/tutorial2_3.png' height='246px'>
<img src='../img/tutorial2_4.png' height='246px'>



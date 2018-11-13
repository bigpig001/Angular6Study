import { Injectable } from '@angular/core';
import { Bullet } from './bullet';

@Injectable({
  providedIn: 'root'
})

export class GameCenterService {
  constructor() { }
  private maxX: number;
  private maxY: number;
  private target: Bullet;
  private bullets: Bullet[];
  private frameNo: number;
  private gameStatus: string;
  private gamescore: number;
  private movespeed: number;

  InitGame(width, height, defaultbullets = 10) {
    this.maxX = width;
    this.maxY = height;
    this.movespeed = 5;
    this.bullets = [];  // bullets reset
    this.frameNo = 0;
    this.gameStatus = 'run';

    // post reset
    this.target = new Bullet();
    this.target.x = width / 2;
    this.target.y = height / 2;
    this.target.radius = 10;

    // init bullets
    for (let i = 0; i < defaultbullets; i++) {
      this.bullets[i] = this._initBullet();
    }
  }

  GetTarget() {
    return this.target;
  }
  GetBullets() {
    return this.bullets;
  }
  GetGameInfo() {
    return {
      'score': this.gamescore,
      'status': this.gameStatus,
    };
  }

  Move(dirt) {
    if (this.gameStatus == null) {
      return;
    }
    let vet = this.movespeed;
    switch (dirt) {
      case 'left':
        if (this.target.x - vet > 0 + this.target.radius) {
          this.target.x -= vet;
        }
        break;
      case 'right':
        if (this.target.x + vet < this.maxX - this.target.radius) {
          this.target.x += vet;
        }
        break;
      case 'up':
        if (this.target.y - vet > 0 + this.target.radius) {
          this.target.y -= vet;
        }
        break;
      case 'down':
        if (this.target.y + vet < this.maxY - this.target.radius) {
          this.target.y += vet;
        }
        break;
      default:
        break;
    }
    // console.log(this.target);
  }

  UpdateGame(): void {

    // update bullets pos
    for (let i = 0; i < this.bullets.length; i++) {
      // check intersect
      if (this._checkIntersect(this.target, this.bullets[i])) {
        this.gameStatus = 'end';
        break;
      }

      // check if bullet out of range, reset it
      if (this.bullets[i].x > this.maxX || this.bullets[i].y >= this.maxY) {
        const vet = Math.floor(Math.random() * 10) + 1;
        this.bullets[i] = this._initBullet();
      } else {
        switch (this.bullets[i].dirt) {
          case 1:
            this.bullets[i].x += this.bullets[i].spd;
            this.bullets[i].y += this.bullets[i].spd;
            break;

          case 2:
            this.bullets[i].x -= this.bullets[i].spd;
            this.bullets[i].y += this.bullets[i].spd;
            break;

          case 3:
            this.bullets[i].x -= this.bullets[i].spd;
            this.bullets[i].y -= this.bullets[i].spd;
            break;

          case 4:
            this.bullets[i].x += this.bullets[i].spd;
            this.bullets[i].y -= this.bullets[i].spd;
            break;

          default:
            break;
        }

      }
    }
    this.gamescore = this.frameNo;
    this.frameNo++;
    if (this.frameNo % 10 === 0) {
      // console.log('bullets:' + this.bullets.length);
      this.bullets[this.bullets.length] = this._initBullet();
    }
  }

  private _initBullet() {
    const vet = Math.floor(Math.random() * 10) + 1;

    let b = new Bullet();
    b.type = 'normal';
    b.x = Math.floor(Math.random() * this.maxX - 1);
    b.y = Math.floor(Math.random() * 100) > 50 ? this.maxY - 10 : 0 + 10;
    b.radius = Math.floor(Math.random() * 10) + 5;
    b.spd = vet;
    if (b.x <= this.maxX / 2 && b.y <= this.maxY / 2) {
      b.dirt = 1;
    } else if (b.x > this.maxX / 2 && b.y <= this.maxY / 2) {
      b.dirt = 2;
    } else if (b.x > this.maxX / 2 && b.y > this.maxY / 2) {
      b.dirt = 3;
    } else {
      b.dirt = 4;
    }
    return b;
  }

  private _checkIntersect(objA, objB) {
    let dx = objB.x - objA.x;
    let dy = objB.y - objA.y;

    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < objA.radius + objB.radius) {
      return true;
    } else {
      return false;
    }
  }
}

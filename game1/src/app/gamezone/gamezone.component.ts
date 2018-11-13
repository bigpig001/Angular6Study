import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Bullet } from '../bullet';
import { GameCenterService } from '../game-center.service';

@Component({
  selector: 'app-gamezone',
  templateUrl: './gamezone.component.html',
  styleUrls: ['./gamezone.component.css']
})
export class GamezoneComponent implements OnInit {
  @ViewChild('canvasGameZone') canvasGameZone: ElementRef;
  /** Canvas 2d context */
  private context: CanvasRenderingContext2D;

  constructor(private GCService: GameCenterService) { }
  width = 800;
  height = 600;
  defaultbullets = 20;
  g;
  target;
  bullets;
  gameinfo;

  ngOnInit() {
    if (this.g) {
      clearInterval(this.g);
    }
    this.canvasGameZone.nativeElement.width = this.width;
    this.canvasGameZone.nativeElement.height = this.height;
    this.context = (this.canvasGameZone.nativeElement as HTMLCanvasElement).getContext('2d');

    // render base
    this.context.fillStyle = '#000000';
    this.context.fillRect(0, 0, this.canvasGameZone.nativeElement.width, this.canvasGameZone.nativeElement.height);

    // render info
    this.context.font = '40px Consolas';
    this.context.fillStyle = '#0FF';
    this.context.fillText('Type [s] Too Start/Restart Game!!', Math.floor(this.width / 5), Math.floor(this.height / 2));
    this.context.fillText('Use Arrow Key To Move', Math.floor(this.width / 5), Math.floor(this.height / 2)+ 50);
    // this.onStart();
    // this.onRender();

  }

  private _getData() {
    this.target = this.GCService.GetTarget();
    this.bullets = this.GCService.GetBullets();
    this.gameinfo = this.GCService.GetGameInfo();
  }
  onStart(): void {
    this.GCService.InitGame(this.width, this.height, this.defaultbullets);
    this._getData();
    this.onRender();

    this.g = setInterval(() => {
      this.onUpdate();
    }, 100);
  }

  onRender(): void {
    // render base
    this.context.fillStyle = '#000000';
    this.context.fillRect(0, 0, this.canvasGameZone.nativeElement.width, this.canvasGameZone.nativeElement.height);

    // render target
    this.context.beginPath();
    this.context.arc(this.target.x, this.target.y, this.target.radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = 'white';
    this.context.fill();

    // render bullets
    for (let i = 0; i < this.bullets.length; i++) {
      this.context.beginPath();
      this.context.arc(this.bullets[i].x, this.bullets[i].y, this.bullets[i].radius, 0, 2 * Math.PI, false);
      this.context.fillStyle = 'rgb(' +
        Math.floor(this.bullets[i].spd * 25) + ',' +
        Math.floor(255 - this.bullets[i].spd * 25) + ',' +
        Math.floor(255 - this.bullets[i].spd * 5) + ')';
      this.context.fill();
    }

    // render info
    this.context.font = '30px Consolas';
    this.context.fillStyle = '#FFF';
    this.context.fillText('bullets:' + this.bullets.length, 20, 120);
    this.context.fillText('score:' + this.gameinfo.score, 20, 160);
  }

  onUpdate(): void {


    // update bullets pos
    this.GCService.UpdateGame();
    this.onRender();

    this._getData();
    // check game status
    if (this.gameinfo.status === 'end') {
      clearInterval(this.g);
      this.context.font = '70px Consolas';
      this.context.fillStyle = '#F00';
      this.context.fillText('Game Over', Math.floor(this.width / 3), Math.floor(this.height / 2));
    }
  }

  onKey(event: KeyboardEvent) {

    switch (event.key.toString().toLowerCase()) {
      case 'arrowleft':
        this.GCService.Move('left');
        break;
      case 'arrowright':
        this.GCService.Move('right');
        break;
      case 'arrowup':
        this.GCService.Move('up');
        break;
      case 'arrowdown':
        this.GCService.Move('down');
        break;
      case 's':
        this.onStart();
        break;
      default:
        break;
    }
  }

}

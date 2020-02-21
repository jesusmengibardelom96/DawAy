import { Component, OnInit } from '@angular/core';
import { FireService } from '../services/fire.service';
import { Music } from '../models/music.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  musics : Music [] = [];
  filterArray: any [] = [];
  constructor(private fire: FireService, private router : Router) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.musics = this.fire.getCollection();
    this.filterArray = this.musics;
  }

  segmentChanged($event){
    let arrayTest = [];
    this.musics = [];
    for (let i of this.filterArray) {
      if (i.fav === $event.detail.value){
        arrayTest.push(i);
      }
    }

    if($event.detail.value === "all"){
      arrayTest = this.fire.getCollection();
    }
    this.musics = arrayTest;
    console.log($event.detail.value);
  }

  goToAdd(){
    this.router.navigateByUrl("add");
  }
}

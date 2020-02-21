import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400
  };
  times: number = 0;
  constructor(private router: Router) {}
  ionViewDidEnter(){
    this.times = JSON.parse(localStorage.getItem("time"));
    if(this.times > 0){
      this.router.navigateByUrl("main");
    }
  }

  goToMain(){
    this.router.navigateByUrl("main");
    localStorage.setItem("time", JSON.stringify(this.times+=1));
  }
}

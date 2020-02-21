import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { LoadingController } from '@ionic/angular';
import { FireService } from '../services/fire.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  name: string = "";
  artist: string = "";
  image: string = "";
  year: number = 0;
  fav: boolean = false;
  constructor(private fire: FireService,private router: Router, private toast: ToastService, private loadingController: LoadingController) { }

  ngOnInit() {
  }
  sendToMain(){
    if (this.name.trim() === "" || this.artist.trim() === "" || this.image.trim() === "") {
      this.toast.presentToast("You can't save a album that dont have name, groupName, image or year, please fill the fields and try again", "danger", 5000);
    }else{
      let favourite = "";
      if(this.fav === true) favourite = "favs";
      else favourite = "all"
      let addAlbum = {
        id: this.fire.createId(),
        name: this.name,
        photo: this.image,
        nameOfGroup: this.artist,
        fav: favourite,
        year: this.year
      };
      this.fire.createAnObject(addAlbum);
      this.backMain();
      this.toast.presentToast("This album has been successfully created ", "success", 2000);
    }
  }
  async backMain() {
    const loading = await this.loadingController.create({
      message: 'Loading albums please wait...',
      spinner: 'dots',
      duration: 3000
    });
    await loading.present();
     const { role, data } = await loading.onDidDismiss();
    this.router.navigateByUrl("main");
  }
}

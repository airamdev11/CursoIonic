import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';

import {HttpClient} from '@angular/common/http';

import {map} from 'rxjs/operators';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
})
export class CitiesPage implements OnInit {

  cities: any = [];

  // eslint-disable-next-line max-len
  constructor(private router: Router, private http: HttpClient, public toastController: ToastController, public alertController: AlertController) { }

  ngOnInit() {
    this.getCities().subscribe(res=>{
      console.log('Res', res);
      this.cities = res;
    });
  }

  goToHome(){
    this.router.navigate(['/home']);
  }

  getCities(){
    return this.http.get('assets/files/cities.json').pipe(map((res: any)=> res.data));
  }

  /*
  async presentToast(){
    const toast = await this.toastController.create({
      message: 'Ciudad seleccionada',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }*/

  async presentAlert1(){
    const alert = await this.alertController.create({
      header: 'Borrar ciudad',
      message: 'Se ha borrado la ciudad correctamente.',
      buttons: ['OK'],
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }

  async presentAlert2(){
    const alert = await this.alertController.create({
      header: 'Borrar ciudad',
      message: '¿Estas seguro de eliminar la ciudad?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No, cancel');
          }
        },
        {
          text:'Si',
          handler: () => {
            console.log('Eliminado.');
          }
        }
      ],
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }

}

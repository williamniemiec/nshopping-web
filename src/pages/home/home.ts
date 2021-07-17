import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { CredentialsDTO } from '../../dto/CredentialsDTO';
import { AuthService } from '../../services/AuthService';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credentials: CredentialsDTO = {
    email: "",
    password: ""
  };

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    public authService: AuthService
  ) {

  }

  login() {
    this.authService
      .authenticate(this.credentials)
      .subscribe(
        (response) => {
          this.authService.successfulLogin(response.headers.get('Authorization'));
          this.navCtrl.setRoot('CategoriesPage');
        },
        (error) => {}
      );
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {
    this.authService
      .refreshToken()
      .subscribe(
        (response) => {
          this.authService.successfulLogin(response.headers.get('Authorization'));
          this.navCtrl.setRoot('CategoriesPage');
        },
        (error) => {}
      );
  }

  signup() {
    this.navCtrl.push("SignupPage")
  }
}

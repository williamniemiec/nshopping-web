import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CredentialsDTO } from '../../dto/credentials.dto';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  credentials: CredentialsDTO = {
    email: "",
    password: ""
  };

  constructor(
    public router: Router, 
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
          this.router.navigateByUrl('/categories');
        },
        (error) => {}
      );
  }

  ngOnInit() {
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }

  ionViewDidEnter() {
    this.authService
      .refreshToken()
      .subscribe(
        (response) => {
          this.authService.successfulLogin(response.headers.get('Authorization'));
          this.router.navigateByUrl('/categories');
        },
        (error) => {}
      );
  }

  signup() {
    this.router.navigateByUrl('/signup');
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CredentialsDTO } from '../../dto/credentials.dto';
import { AuthService } from '../../services/auth.service';


/**
 * Responsible for representing home page.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------
  credentials: CredentialsDTO;


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
    public router: Router, 
    public menu: MenuController,
    public authService: AuthService
  ) {
    this.credentials = {
      email: "",
      password: ""
    };
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  public ngOnInit(): void {
    this.menu.enable(false);
  }

  public login(): void {
    this.authService
      .authenticate(this.credentials)
      .subscribe(
        (response) => {
          this.authService.successfulLogin(this.getAuthorization(response));
          this.router.navigateByUrl('/categories');
        },
        (error) => {
          console.error(error);
        }
      );
  }

  private getAuthorization(response): string {
    return response.headers.get('Authorization');
  }

  public ionViewDidLeave(): void {
    this.menu.enable(true);
  }

  public ionViewDidEnter(): void {
    if (!this.authService.isAuthenticated()) {
      return;
    }

    console.log(this.authService.isAuthenticated())

    this.authService
      .refreshToken()
      .subscribe(
        (response) => {
          this.authService.successfulLogin(this.getAuthorization(response));
          this.router.navigateByUrl('/categories');
        },
        (_) => {}
      );
      
  }

  public signup(): void {
    this.router.navigateByUrl('/signup');
  }
}

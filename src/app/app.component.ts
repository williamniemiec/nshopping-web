import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import RoutePage from './models/route-page';


/**
 * Responsible for defining application template.
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------
  rootPage: string;
  menuPages: Array<RoutePage>;


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
    public platform: Platform, 
    public router: Router,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public authService: AuthService
  ) {
    this.menuPages = this.getMenuPages();
    this.rootPage = '/home';
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  private getMenuPages(): RoutePage[] {
    return [
      { title: 'Categories', url: '/categories', icon: "copy" },
      { title: 'Cart', url: '/cart', icon: "cart" },
      { title: 'Profile', url: '/profile', icon: "person-circle" },
      { title: 'Logout', url: '', icon: "log-out" }
    ];
  }

  public initializeApp(): void {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  public openPage(page: RoutePage): void {
    if (page.title.match('Logout')) {
      this.logout();
    }
    else {
      this.redirectTo(page);
    }
  }

  private logout() {
    this.authService.logout();
    this.router.navigateByUrl('home');
  }

  private redirectTo(page: RoutePage) {
    this.router.navigateByUrl(page.url);
  }
}

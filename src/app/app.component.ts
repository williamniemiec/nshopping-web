import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { AuthService } from './services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class MyApp {
  //@ViewChild(NavController) nav: NavController;

  rootPage: string = '/home';

  pages: Array<{title: string, url: string, icon:string}>;

  constructor(
    public platform: Platform, 
    public router: Router,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public authService: AuthService
  ) {
    //this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Categories', url: '/categories', icon: "copy" },
      { title: 'Cart', url: '/cart', icon: "cart" },
      { title: 'Profile', url: '/profile', icon: "person-circle" },
      { title: 'Logout', url: '', icon: "log-out" }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page: {title: string, url: string, icon:string}) {
    switch (page.title) {
      case 'Logout':
        this.authService.logout();
        this.router.navigateByUrl('home');
        break;
      default:
        this.router.navigateByUrl(page.url);
    }
  }
}

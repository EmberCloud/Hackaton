import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CalculatorPage } from '../pages/calc/calc';
import { RecipesPage } from '../pages/recipes/recipes';
import { AuthPage } from '../pages/auth/auth';
import { FaqPage } from '../pages/faq/faq';
import { ProfilePage } from '../pages/profile/profile';
import { UserprofilePage } from '../pages/userprofile/userprofile';






@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = FaqPage;
  nickname: String = "Unnammed";

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Form Ration', component: ProfilePage },
      { title: 'Recipes', component: RecipesPage },
      { title: 'About', component: FaqPage },
      { title: "Log-in & Sign-up" , component: AuthPage }
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

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openProfile() {

    this.nav.setRoot(UserprofilePage);
  }
}

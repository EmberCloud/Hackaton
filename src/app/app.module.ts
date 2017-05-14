import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';


import { MyApp } from './app.component';
import { CalculatorPage } from '../pages/calc/calc';
import { RecipesPage } from '../pages/recipes/recipes';
import { AuthPage } from '../pages/auth/auth';
import { FaqPage } from '../pages/faq/faq';
import { ProfilePage } from '../pages/profile/profile';
import { UserprofilePage } from '../pages/userprofile/userprofile';
import { Addrecipe } from '../pages/addrecipe/addrecipe';

import { PageHeader } from '../components/page-header/page-header';

import { AuthService } from './services/auth.service';
import { DishService } from './services/dish.service';

import { HttpModule, JsonpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Fullrecipe} from "../pages/fullrecipe/fullrecipe";
import {DishesListService} from "./services/disheslist.service";
import {FullRecipeService} from "./services/fullrecipe.service";
import { SharedService } from "./services/sharedService.service";

@NgModule({
  declarations: [
    MyApp,
    AuthPage,
    RecipesPage,
    CalculatorPage,
    FaqPage,
    ProfilePage,
    PageHeader,
    UserprofilePage,
    Addrecipe,
    Fullrecipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuthPage,
    RecipesPage,
    CalculatorPage,
    FaqPage,
    ProfilePage,
    PageHeader,
    UserprofilePage,
    Addrecipe,
    Fullrecipe
  ],
  providers: [
    AuthService,
    DishesListService,
    DishService,
    FullRecipeService,
    SharedService,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}

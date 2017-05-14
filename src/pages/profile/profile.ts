import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DishService } from '../../app/services/dish.service';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public dishService: DishService) {
      
  }
  

  Weight: String = "";
  Height: String = "";
  Age: String = "";

  Meat: Boolean = false;
  Milk: Boolean = false;
  Sugar: Boolean = false;

  getExceptions(){
    let ex =  [];
    if(this.Meat)ex.push("Meat");
    if(this.Milk)ex.push("Milk");
    if(this.Sugar)ex.push("Sugar");
    return ex;
  }

  getRation() {
    let query = {
      age:  this.Age,
      weight: this.Weight,
      height: this.Height,
    }

    console.log(query);
    
    this.dishService.getRation(query).subscribe(
        data => {
          console.log(data);
          //if(!this.fullrecipe['imageUrl']) this.fullrecipe['imageUrl'] = 'http://localhost:3000/photo/brain.jpg';
        },
        err => console.log(err),
        () => {
          console.log('Gratz!!!');
          
        }
      );

  }
}

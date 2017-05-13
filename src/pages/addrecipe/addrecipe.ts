import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DishService } from '../../app/services/dish.service';

@IonicPage()
@Component({
  selector: 'page-addrecipe',
  templateUrl: 'addrecipe.html',
})
export class Addrecipe {

  types = [
    { value: "Breakfast" },
    { value: "Dinner" },
    { value: "Supper" }
  ];

  foodIntake;

  DishesName: String = "";
  Description: String = "";
  Recipe: String = "";
  UrlPhoto: String = "";
  
  Proteins: String = "";
  Carbohydrates: String = "";
  Fats: String = "";
  Calories: String = "";
  
  Meat: Boolean = false;
  Milk: Boolean = false;
  Sugar: Boolean = false; 

  


  
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private dishService: DishService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Addrecipe');
  }

  
  getExceptions() {
    let exc = [];
    if(this.Meat) exc.push("Meat");
    if(this.Milk) exc.push("Milk");
    if(this.Sugar) exc.push("Sugar");
    return exc;
  }

  onChange(value) {
    this.foodIntake = value; 
  }

  addDish() {

    let newDish = {
      name: this.DishesName,
      shortDescription:  this.Description,
      fullDescription: this.Recipe || "",
      imageUrl: this.UrlPhoto || "",
      constituents: [ this.Proteins, this.Carbohydrates, this.Fats, this.Calories ],
      exceptions: this.getExceptions(),
      foodIntake: this.foodIntake || ""
    }

    this.dishService.addDish(newDish).subscribe(
                        data => {
                          console.log("data");
                          console.log(data);
                        },
                        err => console.log(err),
                        () => console.log('Gratz!!!')
                      );
  }
}

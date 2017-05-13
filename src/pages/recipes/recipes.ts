import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Addrecipe} from "../addrecipe/addrecipe";


@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage {

  search: String = "";

  types = [
    {value: "All"},
    {value: "Meat"},
    {value: "Fish"},
    {value: "Vegetables"},
    {value: "Fruits"}
  ];

  constructor(public navCtrl: NavController) {

  }

  showFullRecept(): void {
    console.log("Display full recept.");
  }

  likeDish(): void {
    console.log("+");
  }

  dislikeDish(): void {
    console.log("-");
  }

  typeSelected() {
    this.navCtrl.push(Addrecipe);
  }
}




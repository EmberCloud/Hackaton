import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Addrecipe} from "../addrecipe/addrecipe";
import {DishesListService} from '../../app/services/disheslist.service';
import {Fullrecipe} from "../fullrecipe/fullrecipe";


@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage implements OnInit {

  search: String = "";

  recipes = []  ;
  foodInTake: String = "";
  period: String = "";

  types = [
    {value: "All"},
    {value: "Meat"},
    {value: "Fish"},
    {value: "Vegetables"},
    {value: "Fruits"}
  ];

  constructor(public navCtrl: NavController, private disheslistService: DishesListService) {

  }

  ngOnInit(): void {
    this.getdisheslist("All", "All");
  }


  showFullRecept(): void {
    this.disheslistService.recipeId;
    console.log("Display full recept.");
    this.navCtrl.push(Fullrecipe);
  }

  getdisheslist(filter: String, period: String) {
    this.disheslistService.disheslist('http://localhost:3000/api/dishes/filter/' + filter + '/period/' + period + '/posts/1')
      .subscribe(
        data => {
          this.recipes = JSON.parse(data);
          console.log("data");
          console.log(data);
        },
        err => console.log(err),
        () => console.log('Gratz!!!')
      );

  }

  OnChanges(value)
  {
    this.period = value;
    this.getdisheslist(this.foodInTake, this.period);
  }

  onChange(value)
  {
    this.foodInTake = value;
    this.getdisheslist(this.foodInTake, this.period);
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




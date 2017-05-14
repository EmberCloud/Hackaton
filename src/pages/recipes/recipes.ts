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

  recipes = [];
  foodInTake: String = "All";
  period: String = "All";

  recipeModel: String = "All";

  types = [
    {value: "All"},
    {value: "Meat"},
    {value: "Fish"},
    {value: "Vegetables"},
    {value: "Fruits"}
  ];

  constructor(public navCtrl: NavController, private disheslistService: DishesListService) {
  this.foodInTake = "All";
  this.period = "All";
  }

  ngOnInit(): void {
    this.getdisheslist("All", "All");
  }


  showFullRecept(_id): void {
    console.log(_id);
    this.navCtrl.push(Fullrecipe, {
      id: _id
    });
  }

  getdisheslist(filter: String, period: String) {
    this.disheslistService.disheslist('http://localhost:3000/api/dish/filter/' + filter + '/period/' + period + '/posts/1')
      .subscribe(
        data => {
          //this.recipes = JSON.parse(data);
          this.recipes = data;
          console.log("data");
          console.log(data);
        },
        err => console.log(err),
        () => console.log('Gratz!!!')
      );

  }

  OnChanges(value)
  {
    this.period = this.recipeModel;
    this.getdisheslist(this.foodInTake, this.period);
    //console.log(this.recipes);
  }

  onChange(value)
  {
    this.foodInTake = value;
    this.getdisheslist(this.foodInTake, this.period);
    //console.log(this.recipes);
  }

  likeDish(id): void {
    console.log("+");
  }

  inlikeDish(id): void {
    console.log("-");
  }

  typeSelected() {
    this.navCtrl.push(Addrecipe);
  }
}




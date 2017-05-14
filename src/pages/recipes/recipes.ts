import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Addrecipe} from "../addrecipe/addrecipe";
import {DishesListService} from '../../app/services/disheslist.service';
import {Fullrecipe} from "../fullrecipe/fullrecipe";

import { SharedService } from '../../app/services/sharedService.service';


@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage implements OnInit {

  search: String = "";

  recipes = [];
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
          this.recipes = data.msg;
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
    console.log(this.recipes);
  }

  onChange(value)
  {
    this.foodInTake = value;
    this.getdisheslist(this.foodInTake, this.period);
    console.log(this.recipes);
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




import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Addrecipe} from "../addrecipe/addrecipe";
import {DishesListService} from '../../app/services/disheslist.service';


@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage implements OnInit {

  search: String = "";

  recepties = {};
  foodInTake: String = "";
  url: String = "";

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
    this.getdisheslist();
  }


  showFullRecept(): void {
    console.log("Display full recept.");
  }

  getdisheslist() {
    this.disheslistService.disheslist()
      .subscribe(
        data => {
          this.recepties = JSON.parse(data);
          console.log("data");
          console.log(data);
        },
        err => console.log(err),
        () => console.log('Gratz!!!')
      );

  }

  onChange(value)
  {
    this.foodInTake = value;
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




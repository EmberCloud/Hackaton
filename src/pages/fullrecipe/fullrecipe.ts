import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FullRecipeService} from "../../app/services/fullrecipe.service";
import {DishesListService} from '../../app/services/disheslist.service';



@IonicPage()
@Component({
  selector: 'page-fullrecipe',
  templateUrl: 'fullrecipe.html',
})


export class Fullrecipe implements OnInit{
  fullrecipe;
  id;

  // ngOnInit(): void {
  //   this.getfullrecipe();
  // }

  constructor(public navCtrl: NavController, public navParams: NavParams, private fullrecipeService: FullRecipeService, private disheslistService: DishesListService) {
  }


  getfullrecipe(recipeId: String) {
    this.fullrecipeService.getfullrecipe('http://localhost:3000/api/dishes/id/' + this.fullrecipe.id)
      .subscribe(
        data => {
          this.fullrecipe = JSON.parse(data);
          console.log("data");
          console.log(data);
        },
        err => console.log(err),
        () => console.log('Gratz!!!')
      );
  }
}

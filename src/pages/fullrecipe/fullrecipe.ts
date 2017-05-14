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
  // fullrecipe = {
  //   imageUrl: "http://localhost:3000/photo/brain.jpg"
  // };
  fullrecipe = {
    name: "Name"
  };
  id;
  loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fullrecipeService: FullRecipeService, private disheslistService: DishesListService,
  public params: NavParams) {
    this.id = params.get("id");
    this.getfullrecipe();
  }
  

  getfullrecipe() {
    this.fullrecipeService.getfullrecipe('http://localhost:3000/api/dish/id/' + this.id)
      .subscribe(
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

  ngOnInit(): void {
    this.getfullrecipe();
  }

  ionViewWillEnter(): void {

  }


}

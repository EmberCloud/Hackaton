import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MakeRationService } from '../../app/services/make_ration.service';


/**
 * Generated class for the Userprofile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html',
})
export class UserprofilePage {

	age: String="";
	weight: String="";

	meat: boolean=false;
	fish: boolean=false;
	fruits: boolean=false;
	vegetables: boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public makeRationService: MakeRationService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Userprofile');
  }

// makeration()
// {
// 	let Ration = Object = {
// 		age: this.age;
// 		weight: this.weight;
// 		meat: this.meat;
// 		fish: this.fish;
// 		fruits: this.fruits;
// 		vegetables: this.vegetables;
// 	};

// 	  this.makeRationService.makeration(Ration)
//                       .subscribe(
//                         data => {
//                           console.log("data");
//                           console.log(data);
//                           this.errorText = "noErrors";
//                         },
//                         err => console.log(err),
//                         () => console.log('Gratz!!!')
//                       );
// }
}

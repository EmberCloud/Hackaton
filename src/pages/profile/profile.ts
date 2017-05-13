import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MakeRationService } from '../../app/services/make_ration.service';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

	age: String="";
	weight: String="";

	meat: boolean=false;
	fish: boolean=false;
	fruits: boolean=false;
	vegetables: boolean=false;

  constructor(public navCtrl: NavController, public makeRationService: MakeRationService) {
      
  }
  
  makeration()
{
	let Ration = Object = {
		age: this.age;
		weight: this.weight;
		meat: this.meat;
		fish: this.fish;
		fruits: this.fruits;
		vegetables: this.vegetables;
	};

	  this.makeRationService.makeration(Ration)
                      .subscribe(
                        data => {
                          console.log("data");
                          console.log(data);
                          this.errorText = "noErrors";
                        },
                        err => console.log(err),
                        () => console.log('Gratz!!!')
                      );
}

SaveClick()
{
	makeration();
}

}

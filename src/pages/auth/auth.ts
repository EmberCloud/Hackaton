import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../app/services/auth.service';



@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
  //,
  //providers: [ AuthService, Http ]
})
export class AuthPage {

  errorText = "";

  username: String = "";
  password: String = "";


  constructor(public navCtrl: NavController, private authService: AuthService) {
  
  }

  loginUser() {
      
      let User: Object = {
        username: this.username,
        password: this.password
      };
      
      this.authService.loginUser(User)
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
  

  signupUser() {

      let User: Object = {
        username: this.username,
        password: this.password
      };

      this.authService.signupUser(User)
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
}

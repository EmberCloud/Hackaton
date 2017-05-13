import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Addrecipe } from './addrecipe';

@NgModule({
  declarations: [
    Addrecipe,
  ],
  imports: [
    IonicPageModule.forChild(Addrecipe),
  ],
  exports: [
    Addrecipe
  ]
})
export class AddrecipeModule {}

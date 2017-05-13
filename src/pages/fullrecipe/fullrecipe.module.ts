import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Fullrecipe } from './fullrecipe';

@NgModule({
  declarations: [
    Fullrecipe,
  ],
  imports: [
    IonicPageModule.forChild(Fullrecipe),
  ],
  exports: [
    Fullrecipe
  ]
})
export class FullrecipeModule {}

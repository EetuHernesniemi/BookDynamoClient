import { NgModule } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  exports:[
    MatGridListModule,
    MatSnackBarModule
  ]
})
export class MaterialDesignModule { }

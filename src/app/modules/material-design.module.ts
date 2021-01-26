import { NgModule } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
  exports:[
    MatGridListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialDesignModule { }

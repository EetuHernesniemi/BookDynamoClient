import { NgModule } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  exports:[
    MatGridListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatIconModule
  ]
})
export class MaterialDesignModule { }

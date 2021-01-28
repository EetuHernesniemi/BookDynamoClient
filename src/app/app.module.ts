import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BookGridComponent } from './components/books-grid/books-grid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignModule } from './modules/material-design.module';
import { BookComponent } from './components/book/book.component';
import { BookDialogComponent } from './components/book-dialog/book-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BookGridComponent,
    BookComponent,
    BookDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialDesignModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

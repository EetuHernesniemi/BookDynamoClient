import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OlBookEntry } from 'src/app/interfaces/ol-book-entry';
import { OlBookEntryArray } from 'src/app/interfaces/ol-book-entry-array';
import { OlBooksService } from 'src/app/services/ol-books.service';

@Component({
  selector: 'app-books-grid',
  templateUrl: './books-grid.component.html',
  styleUrls: ['./books-grid.component.scss']
})

export class BookGridComponent implements OnInit {
  bookEntries: OlBookEntryArray;
  
  constructor(private olBooksService: OlBooksService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getLatestHealthBooks();
  }
  
  getHealthBookSearchData(){//not active
    // this.olBooksService.tryToGetHealthBookSearchData()
    // .subscribe((data) => {
    //   this.booksData = JSON.parse(JSON.stringify(data));
      
    // },
    // (error) => {
    //   this.handleHttpError(error);
    // });
  }

  getLatestHealthBooks(){
    this.olBooksService.tryToGetLatestHealthBooksData()
    .subscribe((data) => {
      const jsonData = JSON.parse(JSON.stringify(data));
      if('entries' in jsonData){
        const dataArray: OlBookEntryArray = jsonData.entries;
        if(dataArray.length > 100) dataArray.length = 100;
        this.bookEntries = dataArray;
      }else{
        console.log('Unexpected json values received');
        this.displayErrorBar();
      }
      console.log(this.bookEntries);
    },
    (error) => {
      this.handleHttpError(error);
    });
  }

  private handleHttpError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned http status code ${error.status}, ` +
        `http body was: ${error.error}`);
    }
    // user-facing error message.
    this.displayErrorBar();
  }

  private displayErrorBar(){
    this.snackBar.open("Something went wrong. Try again later.", "Ok", {
      verticalPosition:'top',
      duration: 2000,
      panelClass: 'error-snackbar'
    });
  }

  tileClick(bookEntry?: OlBookEntry) {
    console.log(bookEntry);
  }


}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OlBooksService } from 'src/app/services/ol-books.service';

@Component({
  selector: 'app-books-grid',
  templateUrl: './books-grid.component.html',
  styleUrls: ['./books-grid.component.scss']
})

export class BookGridComponent implements OnInit {
  booksData: Object;
  booksCount: number;
  
  constructor(private olBooksService: OlBooksService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.booksData = {};
    this.getLatestHealthBooks();
  }
  
  getHealthBookSearchData(){
    this.olBooksService.tryToGetHealthBookSearchData()
    .subscribe((data) => {
      this.booksData = JSON.stringify(data);
    },
    (error) => {
      this.handleHttpError(error);
    });
  }

  getLatestHealthBooks(){
    this.olBooksService.tryToGetLatestHealthBooksData()
    .subscribe((data) => {
      this.booksData = data;
      this.booksData = JSON.stringify(data);
      console.log(this.booksData);
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
    // alert('Something went wrong. Try again later.');

    this.snackBar.open("Something went wrong. Try again later.", "Ok", {
      verticalPosition:'top',
      duration: 2000,
      panelClass: 'error-snackbar'
    });
  }


}

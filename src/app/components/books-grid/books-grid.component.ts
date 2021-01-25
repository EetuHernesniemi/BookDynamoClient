import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OlBooksService } from 'src/app/services/ol-books.service';

@Component({
  selector: 'app-books-grid',
  templateUrl: './books-grid.component.html',
  styleUrls: ['./books-grid.component.scss']
})
export class BookGridComponent implements OnInit {
  booksData: Object;
  
  constructor(private olBooksService: OlBooksService) {}

  ngOnInit(): void {
    this.getLatestHealthBooks();
  }
  
  getHealthBookSearchData(){
    //this.olBooksService.getBookSearchData();
    this.olBooksService.tryToGetHealthBookSearchData()
    .subscribe((data) => {
      this.booksData = data;
    },
    (error) => {
      this.handleHttpError(error);
    });
  }

  getLatestHealthBooks(){
    this.olBooksService.tryToGetLatestHealthBooksData()
    .subscribe((data) => {
      this.booksData = data;
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
    alert('Something went wrong. Try again later.');
  }
}

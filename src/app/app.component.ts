import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import { olBook, OlBooksService } from './services/ol-books.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Book Dynamo';
  book: olBook; 
  error: any;
  booksData: Object;
  
  constructor(private olBooksService: OlBooksService) {}

  getBookSearchData(){
    //this.olBooksService.getBookSearchData();
    this.olBooksService.tryToGetBookSearchData()
    .subscribe((data) => {
      this.booksData = data;
    },
    (error) => {
      this.handleHttpError(error);
    });
  }

  getLatestBooksData(){
    this.olBooksService.tryToGetLatestHealthBooksData()
    .subscribe((data) => {
      this.booksData = data;
    },
    (error) => {
      this.handleHttpError(error);
    });
  }

  ngOnInit(){
    this.getLatestBooksData();
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

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
  loadingDone: boolean;
  searchValue: string;
  constructor(private olBooksService: OlBooksService, private snackBar: MatSnackBar) {  }

  ngOnInit(): void {
    this.loadingDone = false;
    this.searchValue = "";
    this.getDemoBooksData();
  }

  //TODO: Get rid of nested subscribes. replace with better practice functions.
  getDemoBooksData(){
    const classInstance = this;
    classInstance.olBooksService.tryToGetDemoBookListData()
    .subscribe((data) => {
      const jsonData = JSON.parse(JSON.stringify(data));
      if('entries' in jsonData){
        const dataArray: OlBookEntryArray = jsonData.entries;
        if(dataArray.length > 100) dataArray.length = 100;
        dataArray.forEach(function (bookEntry){
          if(bookEntry.url !== undefined){
            classInstance.olBooksService.tryToGetBookData(bookEntry.url)
            .subscribe((bookData) => {
              if(bookData.hasOwnProperty("authors")){
                let bookJsonObj;
                try{
                  bookJsonObj = JSON.parse(JSON.stringify(bookData));
                  if(bookJsonObj.authors.length > 0){
                    classInstance.olBooksService.tryToGetAuthorData(bookJsonObj.authors[0].key)
                    .subscribe((authorData) => {
                      let authorJsonObj;
                      try{
                        authorJsonObj = JSON.parse(JSON.stringify(authorData));
                        bookEntry.author = authorJsonObj.name;
                      }catch{
                        console.log("failed to get authors data from author json.");
                      }
                    });
                  }
                }catch{
                  console.log("failed to get authors data from book json.");
                }
              }
            });
          }
        });
        this.bookEntries = dataArray;
      }else{
        console.log('Unexpected json data values received');
        this.displayErrorBar();
      }
      this.loadingDone = true;
    },
    (error) => {
      this.handleHttpError(error);
      this.loadingDone = true;
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
      duration: 0,
      panelClass: 'errorSnackbar'
    });
  }

  tileClick(bookEntry?: OlBookEntry) {
    console.log(bookEntry);
  }
}

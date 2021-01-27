import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
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
  screenSize: string;
  gridCols: number

  @ViewChild('contentWrapper')
  contentWrapper: ElementRef;

  constructor(private olBooksService: OlBooksService, private snackBar: MatSnackBar, private cdRef:ChangeDetectorRef) {  }

  ngOnInit(): void {
    this.loadingDone = true;
    this.searchValue = "";
  }

  ngAfterViewInit(){
    this.gridToRespondToScreenWidth(this.contentWrapper.nativeElement.offsetWidth);
    this.cdRef.detectChanges();
  }

  gridToRespondToScreenWidth(width: number){
    console.log(width);
    if(width >= 1200){
      this.screenSize = "lg";
      this.gridCols = 5;
    }else if(width >= 992){
      this.screenSize = "md";
      this.gridCols = 4;
    }else if(width >= 768){
      this.screenSize = "sm";
      this.gridCols = 2;
    }else{
      this.screenSize = "xs";
      this.gridCols = 1;
    }
  }

  onResize(event){
    this.gridToRespondToScreenWidth(event.target.innerWidth);
  }

  textSearchBooks(){
    const classInstance = this;
    if(classInstance.searchValue == ""){
      return;
    }
    this.loadingDone = false;
    classInstance.olBooksService.tryToSearchBookListData(classInstance.searchValue)
    .subscribe((data) => {
      const jsonData = JSON.parse(JSON.stringify(data));
      if('docs' in jsonData){
        const dataArray: OlBookEntryArray = jsonData.docs;
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

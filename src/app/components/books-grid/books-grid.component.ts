import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OlBookEntry } from 'src/app/interfaces/ol-book-entry';
import { OlBookEntryArray } from 'src/app/interfaces/ol-book-entry-array';
import { OlBooksService } from 'src/app/services/ol-books.service';
import {MatDialog} from '@angular/material/dialog';
import { BookDialogComponent } from '../book-dialog/book-dialog.component';
import {PageEvent} from '@angular/material/paginator';

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
  pageLength: number;
  pageSize: number;
  pageSizeOptions: number[];
  pageIndex: number;
  pageEvent: PageEvent;
  @ViewChild('contentWrapper')
  contentWrapper: ElementRef;

  constructor(private olBooksService: OlBooksService, private snackBar: MatSnackBar, private cdRef:ChangeDetectorRef, public dialog: MatDialog) {  }

  ngOnInit(): void {
    this.loadingDone = true;
    this.searchValue = "";
  }

  ngAfterViewInit(){
    this.gridToRespondToScreenWidth(this.contentWrapper.nativeElement.offsetWidth);
    this.cdRef.detectChanges();
  }

  gridToRespondToScreenWidth(width: number){
    if(width >= 1200){
      this.screenSize = "lg";
      this.gridCols = 4;
    }else if(width >= 992){
      this.screenSize = "md";
      this.gridCols = 3;
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

  setPageSizingOptions(currentPageLength: number){
    let optionsStr: string;
    if(currentPageLength < 11){
      optionsStr = "10";
    }else if(currentPageLength < 21){
      optionsStr = "10,20";
    }else{
      optionsStr = "10,20,50";
    }
    this.pageSizeOptions = optionsStr.split(',').map(str => +str);
  }

  textSearchBooks(){
    if(this.searchValue == ""){
      return;
    }
    this.loadingDone = false;
    this.pageLength = 0;
    this.olBooksService.tryToSearchBookListData(this.searchValue)
    .subscribe((data) => {
      const jsonData = JSON.parse(JSON.stringify(data));
      if('docs' in jsonData){
        const dataArray: OlBookEntryArray = jsonData.docs;
        this.bookEntries = dataArray;
        this.pageLength = dataArray.length;
        this.setPageSizingOptions(this.pageLength);
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
    if(bookEntry.cover_i > 0){
      const img = new Image();
      //this preloads the image so the dialog afterwards opens as full size
      img.src = "http://covers.openlibrary.org/b/id/" + bookEntry.cover_i + "-L.jpg"; 
      img.onload = () => {
        const dialogRef = this.dialog.open(BookDialogComponent);
        dialogRef.componentInstance.bookEntry = bookEntry;
        dialogRef.componentInstance.dialogRef = dialogRef;
      }
    }
  }
}
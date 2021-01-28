import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OlBookEntry } from 'src/app/interfaces/ol-book-entry';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.scss']
})
export class BookDialogComponent implements OnInit {
  @Input() bookEntry: OlBookEntry;
  @Input() dialogRef: MatDialogRef<BookDialogComponent, any>
  constructor() { }

  ngOnInit(): void {
    
  }

  closeDialog(){
    this.dialogRef.close();
  }

}

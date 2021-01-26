import { Component, Input, OnInit } from '@angular/core';
import { OlBookEntry } from 'src/app/interfaces/ol-book-entry';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() bookEntry: OlBookEntry;
  constructor() { }

  ngOnInit(): void {
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class OlBooksService {
  serviceBaseUrl = 'http://openlibrary.org';
  constructor(private http: HttpClient) {}

  tryToSearchBookListData(searchValue: String){
    const queryUrl = this.serviceBaseUrl + "/search.json?q=" + searchValue;
    return this.http.get(queryUrl);
  }
}

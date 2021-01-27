import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class OlBooksService {
  serviceBaseUrl = 'http://openlibrary.org';
  constructor(private http: HttpClient) {}

  tryToGetDemoBookListData(){
    const queryUrl = this.serviceBaseUrl + "/people/s_endo/lists/OL185980L/seeds.json";
    return this.http.get(queryUrl);
  }

  tryToGetBookData(bookUrl: String){
    const queryUrl = this.serviceBaseUrl + bookUrl + ".json";
    return this.http.get(queryUrl);
  }

  tryToGetAuthorData(authorUrl: String){
    const queryUrl = this.serviceBaseUrl + authorUrl + ".json";
    return this.http.get(queryUrl);
  }
}

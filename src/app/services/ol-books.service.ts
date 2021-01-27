import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class OlBooksService {
  serviceBaseUrl = 'http://openlibrary.org';
  constructor(private http: HttpClient) {}

  tryToGetDemoBooksData(){
    const queryUrl = this.serviceBaseUrl + "/people/s_endo/lists/OL185980L/seeds.json";
    return this.http.get(queryUrl);
  }
}

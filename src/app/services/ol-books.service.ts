import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface olBook{
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class OlBooksService {
  serviceBaseUrl = 'http://openlibrary.org';
  constructor(private http: HttpClient) {}

  tryToGetBookSearchData(){
    const queryUrl = this.serviceBaseUrl + "/subjects/health.json";
    return this.http.get(queryUrl);
  }

  tryToGetLatestHealthBooksData(){
    const queryUrl = this.serviceBaseUrl + "/subjects/health.json";
    return this.http.get(queryUrl);
  }
}

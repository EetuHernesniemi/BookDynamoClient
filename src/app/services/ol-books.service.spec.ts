import { TestBed } from '@angular/core/testing';

import { OlBooksService } from './ol-books.service';

describe('OlBooksService', () => {
  let service: OlBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OlBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

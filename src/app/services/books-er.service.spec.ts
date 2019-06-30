import { TestBed } from '@angular/core/testing';

import { BooksErService } from './books-er.service';

describe('BooksErService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BooksErService = TestBed.get(BooksErService);
    expect(service).toBeTruthy();
  });
});

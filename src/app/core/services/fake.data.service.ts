import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FakeDataService {
  private data = [
    { id: 1, name: 'Item 1', description: 'Description of Item 1', image: 'images/chinese2-01.png' },
    { id: 2, name: 'Item 1', description: 'Description of Item 1', image: 'images/Valentine.png' },
    { id: 3, name: 'Item 1', description: 'Description of Item 1', image: 'images/20Years.png' },
  ];


  getData() {
    return this.data;
  }
}

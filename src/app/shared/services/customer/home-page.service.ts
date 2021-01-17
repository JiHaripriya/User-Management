import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  openCartModal = new Subject<boolean>();

  constructor() {}
}

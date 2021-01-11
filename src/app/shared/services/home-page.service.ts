import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  passTitle = new Subject<string>();
  loadProfileStatus = new Subject<boolean>();
  
  constructor() { }
}

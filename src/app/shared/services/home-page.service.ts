import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  loadProfileStatus = new Subject<boolean>();
  
  constructor() { }
}

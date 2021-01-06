import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  deleteFormParameters = new Subject<{index: number}>();
  
  constructor() { }
}

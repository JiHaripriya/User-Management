import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  tableStatus = new Subject<boolean>();
  constructor() {}
}

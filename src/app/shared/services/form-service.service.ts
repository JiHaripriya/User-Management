import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserDetails } from '../models/user-details.model';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  openAddUserForm = new Subject<boolean>();
  openEditUserForm = new Subject<UserDetails>();
  deleteFormParameters = new Subject<{index: number}>();

  constructor() { }
}

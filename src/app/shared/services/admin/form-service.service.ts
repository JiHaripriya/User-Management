import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserDetails } from '../../models/user-details.model';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  openAddUserForm = new Subject<boolean>();
  openEditUserForm = new Subject<{ data: UserDetails, selectedId: number }>();
  deleteFormParameters = new Subject<{ index: number }>();

  openProjectAddForm = new Subject<boolean>();
  openProjectEditForm = new Subject<boolean>();

  openProjectDetails = new Subject<boolean>();

  constructor() { }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDetails } from 'src/app/shared/models/user-details.model';
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { FormServiceService } from 'src/app/shared/services/form-service.service';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.css'],
})
export class DetailsFormComponent implements OnInit {
  @ViewChild('content') detailsForm: ElementRef;
  userDetails: UserDetails[];
  addUserForm: FormGroup;
  formTitle = '';
  isPending = false;

  constructor(
    private modalService: NgbModal,
    private formService: FormServiceService,
    private authService: AuthService,
    private userDetailsApi: UserDetailsService
  ) {}

  ngOnInit(): void {
    this.formService.openAddUserForm.subscribe((status) => {
      if (status) {
        this.onAdd(this.detailsForm);
      }
    });

    this.formService.openEditUserForm.subscribe((userData) => {
      this.onEdit(this.detailsForm, userData);
    });

    this.addUserForm = new FormGroup({
      firstname: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z ]+'),
      ]),
      lastname: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z ]+'),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      status: new FormControl(null),
    });
  }

  private onAdd(content) {
    this.formTitle = 'Add';
    this.addUserForm.reset();
    this.modalService.open(content);
  }

  private onEdit(content, userDetails) {
    this.formTitle = 'Edit';

    // If the user's status is pending, we need to enable editing of other form values
    this.isPending = userDetails.status === 'pending' ? true : false;

    this.addUserForm.setValue({
      firstname: userDetails.firstname,
      lastname: userDetails.lastname,
      email: userDetails.email,
      status: userDetails.status,
    });

    this.modalService.open(content);
  }

  onSubmit() {
    // New user's status is appended as pending by default
    const userDetails =
      this.formTitle === 'Add'
        ? Object.assign(this.addUserForm.value, {
            status: 'pending',
            role: 'user',
            link: 'http://localhost:4200/setPassword'
          })
        : this.addUserForm.value;

    // New user
    if (this.formTitle === 'Add') {
      this.authService.signup(userDetails.email);
      this.userDetailsApi.addUser(userDetails);
    } else {
      // Logic to update edited details
      console.log(this.addUserForm.value);
    }

    this.modalService.dismissAll();
  }
}

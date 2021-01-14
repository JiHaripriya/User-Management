import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UserDetails } from 'src/app/shared/models/user-details.model';
import { FormServiceService } from 'src/app/shared/services/admin/form-service.service';
import { AuthService } from 'src/app/shared/services/api/auth-service.service';
import { UserDetailsService } from 'src/app/shared/services/api/user-details.service';

@Component({
  selector: 'app-product-add-edit-form',
  templateUrl: './product-add-edit-form.component.html',
  styleUrls: ['./product-add-edit-form.component.css']
})
export class ProductAddEditFormComponent implements OnInit {

  @ViewChild('content') productForm: ElementRef;
  userDetails: UserDetails[];
  addProductForm: FormGroup;
  addProductSubscription: Subscription;
  editProductSubscription: Subscription;
  formTitle = '';
  isPending = false;
  index: number;

  constructor(
    private modalService: NgbModal,
    private formService: FormServiceService,
    private authService: AuthService,
    private userDetailsApi: UserDetailsService
  ) { }

  ngOnInit(): void {
    this.addProductSubscription = this.formService.openProjectAddForm.subscribe(
      (status) => {
        if (status) {
          this.onAdd(this.productForm);
        }
      }
    );

    this.editProductSubscription = this.formService.openProjectEditForm.subscribe(
      (status) => {
        if (status) {
          this.onEdit(this.productForm);
        }
      }
    );

    this.addProductForm = new FormGroup({
      firstname: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z ]+'),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z ]+'),
      ]),
      price: new FormControl(null, [
        Validators.required,
        Validators.pattern('[1-9]+'),
      ]),
    });
  }

  private onAdd(content) {
    this.formTitle = 'Add';
    this.addProductForm.reset();
    this.modalService.open(content);
  }

  private onEdit(content) {
    this.formTitle = 'Edit';

    // If the user's status is pending, we need to enable editing of other form values
    // this.isPending = userDetails.status === 'pending' ? true : false;

    // this.addProductForm.setValue({
    //   firstname: this.capitalizeFirstLetter(userDetails.firstname),
    //   lastname: this.capitalizeFirstLetter(userDetails.lastname),
    //   email: userDetails.email,
    //   status: userDetails.status,
    // });

    this.modalService.open(content);
  }

  private capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  onSubmit() {
    // New user's status is appended as pending by default
    const userDetails =
      this.formTitle === 'Add'
        ? Object.assign(this.addProductForm.value, {
          status: 'pending',
          role: 'user',
          link: 'http://localhost:4200/setPassword',
        })
        : this.addProductForm.value;

    // New user
    if (this.formTitle === 'Add') {
      this.userDetailsApi.addUser(userDetails);
    } else {
      // Logic to update edited details
      this.userDetailsApi.updateUser(userDetails, this.index);
    }
    this.modalService.dismissAll();
  }

  ngOnDestroy() {
    this.addProductSubscription.unsubscribe();
    this.editProductSubscription.unsubscribe();
  }

}

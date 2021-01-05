import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UserDetails } from 'src/app/shared/models/user-details.model';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  userDetails: UserDetails[];
  userDetailsSubscription: Subscription;
  loading = false;
  role: string;
  addUserForm: FormGroup;
  formTitle = '';
  isPending = false;

  constructor(
    private userDetailsApi: UserDetailsService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.role = this.route.snapshot.data['role'];

    this.loading = true;
    this.userDetailsApi.fetchUserList();
    this.userDetailsSubscription = this.userDetailsApi
      .fetchUserList()
      .subscribe((data) => {
        this.userDetails = data;
        this.loading = false;
      });

    this.addUserForm = new FormGroup({
      firstName: new FormControl(null, [
        Validators.required,
        Validators.pattern(new RegExp('[a-zA-Z]+', 'g')),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.pattern(new RegExp('[a-zA-Z]+', 'g')),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      status: new FormControl(null), // status is not mandatory as we are reusing the form
    });
  }

  onAdd(content) {
    this.formTitle = 'Add';
    this.addUserForm.reset();
    this.modalService.open(content);
  }

  onEdit(content, index) {
    this.formTitle = 'Edit';

    // If the user's status is pending, we need to enable editing of other form values
    this.isPending =
      this.userDetails[index].status === 'pending' ? true : false;

    this.addUserForm.setValue({
      firstName: this.userDetails[index].first_name,
      lastName: this.userDetails[index].last_name,
      email: this.userDetails[index].email,
      status: this.userDetails[index].status,
    });
    console.log(index);
    this.modalService.open(content);
  }

  onSubmit() {
    // New user's status is appended as pending by default
    const userDetails =
      this.formTitle === 'Add'
        ? Object.assign(this.addUserForm.value, { status: 'pending' })
        : this.addUserForm.value;
    console.log(userDetails);
    this.modalService.dismissAll();
  }

  ngOnDestroy() {
    // this.userDetailsSubscription.unsubscribe();
  }
}

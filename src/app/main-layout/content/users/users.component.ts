import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UserDetails } from 'src/app/shared/models/user-details.model';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';
import { AuthService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  userDetails: UserDetails[];
  userDetailsSubscription: Subscription;
  reloadSubscription: Subscription;
  loading = false;
  role: string;
  addUserForm: FormGroup;
  formTitle = '';
  isPending = false;

  constructor(
    private userDetailsApi: UserDetailsService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.reloadSubscription = this.userDetailsApi.reloadComponent.subscribe(
      (status) => {
        if (status === true) {
          this.ngOnInit();
        }
        this.reloadSubscription.unsubscribe();
      }
    );

    this.role = this.route.snapshot.data['role'];

    this.loading = true;

    this.userDetailsSubscription = this.userDetailsApi
      .fetchUserList()
      .subscribe((data) => {
        this.userDetails = data;
        this.loading = false;
      });

    this.addUserForm = new FormGroup({
      first_name: new FormControl(null, [
        Validators.required,
        Validators.pattern(new RegExp('[a-zA-Z]+', 'g')),
      ]),
      last_name: new FormControl(null, [
        Validators.required,
        Validators.pattern(new RegExp('[a-zA-Z]+', 'g')),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      status: new FormControl(null),
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
      first_name: this.userDetails[index].first_name,
      last_name: this.userDetails[index].last_name,
      email: this.userDetails[index].email,
      status: this.userDetails[index].status,
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
            token: '',
          })
        : this.addUserForm.value;

    // New user
    if (this.formTitle === 'Add') {
      this.authService.signup(userDetails.email);
      this.userDetailsApi.addUser(userDetails);
    }
    // Logic to update edited details

    this.modalService.dismissAll();
  }

  ngOnDestroy() {
    this.userDetailsSubscription.unsubscribe();
    this.reloadSubscription.unsubscribe();
  }
}

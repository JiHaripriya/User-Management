import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UserDetails } from 'src/app/shared/models/user-details.model';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  userDetails: UserDetails[];
  userDetailsSubscription: Subscription;
  loading = false;
  addUserForm: FormGroup;
  formTitle = '';

  constructor(private userDetailsApi: UserDetailsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loading = true;
    this.userDetailsApi.fetchUserList();
    this.userDetailsSubscription = this.userDetailsApi.fetchUserList().subscribe(
      data => {
        this.userDetails = JSON.parse(JSON.stringify(data));
        this.loading = false;
      }
    )

    this.addUserForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'status': new FormControl('select', Validators.required)
    })

  }

  onAdd(content) {
    this.formTitle = 'Add';
    this.modalService.open(content);
  }

  onEdit(content, index) {
    this.formTitle = 'Edit';
    this.addUserForm.setValue({
      'firstName': this.userDetails[index].first_name,
      'lastName': this.userDetails[index].last_name,
      'email': this.userDetails[index].email,
      'status': this.userDetails[index].status,
    })
    console.log(index);
    this.modalService.open(content);
  }

  onSubmit() {
    console.log(this.addUserForm.value);
    this.modalService.dismissAll()
  }

  ngOnDestroy() {
    // this.userDetailsSubscription.unsubscribe();
  }
}

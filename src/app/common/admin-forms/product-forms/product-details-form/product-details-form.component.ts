import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
// import { UserDetails } from 'src/app/shared/models/user-details.model';
import { FormServiceService } from 'src/app/shared/services/admin/form-service.service';
import { AuthService } from 'src/app/shared/services/api/auth-service.service';
import { UserDetailsService } from 'src/app/shared/services/api/user-details.service';

@Component({
  selector: 'app-product-details-form',
  templateUrl: './product-details-form.component.html',
  styleUrls: ['./product-details-form.component.css']
})
export class ProductDetailsFormComponent implements OnInit {

  @ViewChild('content') DetailForm: ElementRef;

  productDetailsSubscription: Subscription;
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
    this.productDetailsSubscription = this.formService.openProjectDetails.subscribe(
      (status) => {
        if (status) {
          this.modalService.open(this.DetailForm);
        }
      }
    );

  }

  ngOnDestroy() {
    this.productDetailsSubscription.unsubscribe();
  }

}

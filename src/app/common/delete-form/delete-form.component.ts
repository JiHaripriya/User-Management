import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { FormServiceService } from 'src/app/shared/services/form-service.service';
import { UserDetailsService } from 'src/app/shared/services/user-details.service';

@Component({
  selector: 'app-delete-form',
  templateUrl: './delete-form.component.html',
  styleUrls: ['./delete-form.component.css'],
})
export class DeleteFormComponent implements OnInit, OnDestroy {
  @ViewChild('delete') deleteModal: ElementRef;
  index: number;
  subscription: Subscription;

  constructor(
    private modalService: NgbModal,
    private formService: FormServiceService,
    private userDetailsApi: UserDetailsService
  ) {}

  ngOnInit(): void {
    this.subscription = this.formService.deleteFormParameters.subscribe(
      (params) => {
        this.modalService.open(this.deleteModal);
        this.index = params.index; // user to be deleted
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteUser() {
    this.userDetailsApi.deleteUser(this.index);
    this.userDetailsApi.reloadComponent.next(true);
    this.modalService.dismissAll();
  }
}

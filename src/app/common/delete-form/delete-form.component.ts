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
    private formService: FormServiceService
  ) {}

  ngOnInit(): void {
    this.subscription = this.formService.deleteFormParameters.subscribe(
      (params) => {
        console.log(params);
        this.modalService.open(this.deleteModal);
        this.index = params.index; // user to be deleted
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HomePageService } from 'src/app/shared/services/customer/home-page.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  @ViewChild('cartModal') cardModal: ElementRef;
  count = 2;
  totalAmount = 1000;

  constructor(
    private customerHomePage: HomePageService,
    private modalService: NgbModal
  ) {}

  images = [
    '01',
    '02',
    '03',
    '01',
    '02',
    '03',
    '01',
    '02',
    '03',
    '01',
    '02',
    '03',
  ].map((num) => `../../../assets/images/product-${num}.jpg`);

  ngOnInit(): void {
    this.customerHomePage.openCartModal.subscribe((status) => {
      if (status)
        this.modalService.open(this.cardModal, {
          beforeDismiss: this.closeModal,
        });
    });
  }

  closeModal = () => {
    this.customerHomePage.openCartModal.next(false);
    return true;
  };
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/shared/services/customer/cart.service';
import { HomePageService } from 'src/app/shared/services/customer/home-page.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  @ViewChild('cartModal') cardModal: ElementRef;
  count = 2;
  totalAmount;
  items;

  constructor(
    private customerHomePage: HomePageService,
    private modalService: NgbModal,
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.items = items;
      this.totalAmount = this.items.map(incart => incart.ProductsCarts.product_quantity * incart.price).reduce((a, b) => Number(a) + Number(b), [])
    })
    
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

  calculateTotal(){
    this.totalAmount = this.items.map(incart => incart.ProductsCarts.product_quantity * incart.price).reduce((a, b) => Number(a) + Number(b), [])
  }
}

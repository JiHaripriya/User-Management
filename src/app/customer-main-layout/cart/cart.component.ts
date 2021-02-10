import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UserDetailsService } from 'src/app/shared/services/api/user-details.service';
import { CartService } from 'src/app/shared/services/customer/cart.service';
import { HomePageService } from 'src/app/shared/services/customer/home-page.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  @ViewChild('cartModal') cardModal: ElementRef;
  count = 2;
  totalAmount;
  items;
  reloadSubscription: Subscription;
  itemSubscription: Subscription;
  modalSubscription: Subscription;

  constructor(
    private customerHomePage: HomePageService,
    private modalService: NgbModal,
    private cartService: CartService,
    private reload: UserDetailsService
  ) {}

  ngOnInit(): void {
    this.reloadSubscription = this.reload.reloadComponent.subscribe(
      (status) => {
        if (status === true) {
          this.ngOnInit();
        }
        this.reloadSubscription.unsubscribe();
        this.modalSubscription.unsubscribe();
      }
    );
    this.modalSubscription = this.customerHomePage.openCartModal.subscribe(
      (status) => {
        if (status)
          this.modalService.open(this.cardModal, {
            beforeDismiss: this.closeModal,
          });
      }
    );

    this.itemSubscription = this.cartService
      .getCartItems()
      .subscribe((items) => {
        this.items = items;
        this.cartService.cartItems.next(this.items.length);
        this.totalAmount = this.items
          .map((incart) => incart.ProductsCarts.product_quantity * incart.price)
          .reduce((a, b) => Number(a) + Number(b), []);
      });
  }

  closeModal = () => {
    this.customerHomePage.openCartModal.next(false);
    return true;
  };

  calculateTotal() {
    this.totalAmount = this.items
      .map((incart) => incart.ProductsCarts.product_quantity * incart.price)
      .reduce((a, b) => Number(a) + Number(b), []);
  }

  removeItem(productId: number) {
    this.cartService.removeCartItem(productId);
    this.cartService.cartItems.next(
      this.items.filter((data) => data.id !== productId).length
    );
  }

  ngOnDestroy() {
    this.reloadSubscription.unsubscribe();
    this.itemSubscription.unsubscribe();
  }
}

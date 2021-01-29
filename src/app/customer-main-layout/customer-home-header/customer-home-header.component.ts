import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/shared/services/customer/cart.service';
import { HomePageService } from 'src/app/shared/services/customer/home-page.service';

@Component({
  selector: 'app-customer-home-header',
  templateUrl: './customer-home-header.component.html',
  styleUrls: ['./customer-home-header.component.css'],
})
export class CustomerHeaderComponent implements OnInit, OnDestroy {
  fixHeader = false;
  hideScrollButton = false;
  expandSearch = false;
  title = '';
  count;
  @ViewChild('searchText') searchText: ElementRef;
  cartSubscription: Subscription;

  constructor(
    private router: Router,
    private customerHomePage: HomePageService,
    private cartService: CartService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.title = event.url.split('/').pop();
      }
    });
  }

  ngOnInit() {
    window.addEventListener('scroll', this.scrollEvent, true);
    this.customerHomePage.openCartModal.subscribe((status) => {
      if (!status) {
        window.addEventListener('scroll', this.scrollEvent, true);
        this.hideScrollButton = true;
      }
    });

    this.cartService.cartItems.subscribe((count) => this.count = count);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollEvent, true);
    this.cartSubscription.unsubscribe();
  }

  scrollEvent = (event: any): void => {
    let headerScroll = event.srcElement.scrollingElement.scrollTop;
    if (headerScroll >= 30) {
      this.fixHeader = true;
      this.hideScrollButton = true;
    }
    else{
      this.fixHeader = false;
      this.hideScrollButton = false;
    } 
  };

  onSearch() {
    this.expandSearch = true;
  }

  clearSearch() {
    this.expandSearch = false;
    this.searchText.nativeElement.value = '';
  }

  openCartModal() {
    this.customerHomePage.openCartModal.next(true);
    this.hideScrollButton = false;
    window.removeEventListener('scroll', this.scrollEvent, true);
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}

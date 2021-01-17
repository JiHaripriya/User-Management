import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HomePageService } from 'src/app/shared/services/customer/home-page.service';

@Component({
  selector: 'app-customer-home-header',
  templateUrl: './customer-home-header.component.html',
  styleUrls: ['./customer-home-header.component.css'],
})
export class CustomerHeaderComponent implements OnInit, OnDestroy {
  fixHeader = false;
  expandSearch = false;
  title = '';
  count = 0;
  @ViewChild('searchText') searchText: ElementRef;

  constructor(
    private router: Router,
    private customerHomePage: HomePageService
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
      if (!status) window.addEventListener('scroll', this.scrollEvent, true);
    });
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollEvent, true);
  }

  scrollEvent = (event: any): void => {
    let headerScroll = event.srcElement.scrollingElement.scrollTop;
    if (headerScroll >= 30) this.fixHeader = true;
    else this.fixHeader = false;
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
    window.removeEventListener('scroll', this.scrollEvent, true);
  }
}

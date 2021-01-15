import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-customer-home-header',
  templateUrl: './customer-home-header.component.html',
  styleUrls: ['./customer-home-header.component.css'],
})
export class CustomerHeaderComponent implements OnInit {
  fixHeader = false;
  expandSearch = false;
  fontColorWhite: boolean;
  title = '';
  @ViewChild('searchText') searchText: ElementRef;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.title = event.url.split('/').pop();
        if (this.title === 'contact') {
          this.fontColorWhite = true;
        } else this.fontColorWhite = false;
      }
    });
  }

  ngOnInit() {
    window.addEventListener('scroll', this.scrollEvent, true);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollEvent, true);
  }

  scrollEvent = (event: any): void => {
    let headerScroll = event.srcElement.scrollingElement.scrollTop;
    if (headerScroll >= 30) {
      this.fixHeader = true;
      this.fontColorWhite = false;
    } else {
      this.fixHeader = false;
      this.fontColorWhite =
        this.router.url.split('/').pop() === 'contact' ? true : false;
    }
  };

  onSearch() {
    this.expandSearch = true;
  }

  clearSearch() {
    this.expandSearch = false;
    this.searchText.nativeElement.value = '';
  }
}

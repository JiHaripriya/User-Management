import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-home-header',
  templateUrl: './customer-home-header.component.html',
  styleUrls: ['./customer-home-header.component.css']
})
export class CustomerHeaderComponent implements OnInit {
  
  fixHeader = false;

  ngOnInit() {
    window.addEventListener('scroll', this.scrollEvent, true);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollEvent, true);
  }

  scrollEvent = (event: any): void => {
    let headerScroll = event.srcElement.scrollingElement.scrollTop;
    if(headerScroll >= 30)  this.fixHeader = true;
    else this.fixHeader = false;
  }

}

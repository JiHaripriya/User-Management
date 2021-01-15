import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  images = ["01", "02", "03"].map((num) => `../../../assets/images/banner-${num}.jpg`);

  constructor() { }

  ngOnInit(): void {
  }

}

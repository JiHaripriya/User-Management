import { Component, OnInit } from '@angular/core';
import { FormServiceService } from 'src/app/shared/services/admin/form-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  searchItem;

  products = [{
    'name': 'Watch',
    'price': '200',
    'imgsrc': 'product-06.jpg'
  },
  {
    'name': 'Shoe',
    'price': '400',
    'imgsrc': 'product-09.jpg'
  },
  {
    'name': 'Dress',
    'price': '300',
    'imgsrc': 'product-12.jpg'
  },
  {
    'name': 'Watch',
    'price': '300',
    'imgsrc': 'product-15.jpg'
  },
  {
    'name': 'Watch',
    'price': '300',
    'imgsrc': 'product-15.jpg'
  },
  {
    'name': 'Dress',
    'price': '300',
    'imgsrc': 'product-12.jpg'
  },
  {
    'name': 'Watch',
    'price': '200',
    'imgsrc': 'product-06.jpg'
  },
  {
    'name': 'Shoe',
    'price': '400',
    'imgsrc': 'product-09.jpg'
  }
  ];


  constructor(private formService: FormServiceService) { }

  ngOnInit(): void {
  }

  onAdd() {
    this.formService.openProjectAddForm.next(true);
  }

  onEdit() {
    this.formService.openProjectEditForm.next(true);
  }

}

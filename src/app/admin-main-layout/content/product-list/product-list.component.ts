import { Component, OnInit } from '@angular/core';
import { FormServiceService } from 'src/app/shared/services/admin/form-service.service';
import { ProductDetailsService } from 'src/app/shared/services/api/product-details.service';

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
  productList: any;
  loading = false

  constructor(private formService: FormServiceService, private productListService: ProductDetailsService) { }

  ngOnInit(): void {
    this.loading = true;
    this.productListService.fetchProductList().subscribe((res) => {
      this.productList = res;
      console.log(res);
      this.loading = false;
    })
  }

  onAdd() {
    this.formService.openProjectAddForm.next(true);
  }

  onEdit() {
    this.formService.openProjectEditForm.next(true);
  }

  onView() {
    this.formService.openProjectDetails.next(true);
  }
}

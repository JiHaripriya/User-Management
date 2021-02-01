import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductServicesService } from 'src/app/shared/services/api/product-services.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {

  constructor(private productServices: ProductServicesService) { }

  ngOnInit(): void {
  }

  onListView(){
    this.productServices.listViewSelected.next(true);
  }

  onGridView(){
    this.productServices.collapselistView.next(true);
  }

}

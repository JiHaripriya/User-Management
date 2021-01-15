import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/shared/services/table.service';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css'],
})
export class SubCategoriesComponent implements OnInit {
  tableBody = [
    {
      id: 3,
      name: 'category name1',
      category: 'NAME1',
    },
    {
      id: 555,
      name: 'category name2',
      category: 'NAME2',
    },
  ];
  constructor(private tableService: TableService) {}

  ngOnInit(): void {
    this.tableService.tableValues.next(this.tableBody);
  }
}

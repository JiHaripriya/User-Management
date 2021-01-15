import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/shared/services/table.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  tableBody = [
    {
      id: 3,
      name: 'category name1',
    },
    {
      id: 555,
      name: 'category name2',
    },
  ];
  constructor(private tableService: TableService) {}

  ngOnInit(): void {
    this.tableService.tableValues.next(this.tableBody);
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TableService } from 'src/app/shared/services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnDestroy {
  valueSubscription: Subscription;
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
  tableHeaders = Object.keys(this.tableBody[0]);

  constructor(private tableService: TableService) {}

  ngOnInit(): void {
    for (let i = 0; i < 2; i++) this.tableHeaders.push('');

    this.valueSubscription = this.tableService.tableValues.subscribe((data) => {
      this.tableBody = data;
      this.tableHeaders = Object.keys(this.tableBody[0]);
      for (let i = 0; i < 2; i++) this.tableHeaders.push('');
    });
  }

  ngOnDestroy() {
    this.valueSubscription.unsubscribe();
  }

  onEdit(id) {
    console.log(id);
  }
  onDelete(id) {
    console.log(id);
  }
}

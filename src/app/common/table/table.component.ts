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
  tableBody = [];
  tableHeaders = [];

  constructor(private tableService: TableService) {
    this.valueSubscription = this.tableService.tableValues.subscribe((data) => {
      this.tableBody = data;
      this.tableHeaders = Object.keys(this.tableBody[0]);
      for (let i = 0; i < 2; i++) this.tableHeaders.push('');
    });
  }

  ngOnInit(): void {}

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

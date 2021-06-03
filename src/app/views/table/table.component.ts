import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { TableConfig } from 'src/app/shared/interfaces/table.interface';
import { TableService } from 'src/app/shared/services/table.service';
import { TableDataSource } from './table.datasource';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource();
  incomingData: TableDataSource = {} as TableDataSource;
  filterValue: string = ''

  @Input() tableConfig: TableConfig = {} as TableConfig;
  displayedColumns: string[] = [];

  private searchSubscription?: Subscription;

  hasMatch = true

  @Output() btnEvent = new EventEmitter();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private tableService: TableService) { }

  ngOnInit(): void {
    console.log(this.tableConfig)
    this.createDataSource()

    this.searchSubscription = this.tableService.observer.subscribe((value) => {
      this.createDataSource()
    });

    this.displayedColumns = [
      ...this.tableConfig.columnsAndData.map((i) => i.dataKey),
      ...(this.tableConfig.button?.map((i) => i.column) || []),
    ];
  }

  ngOnDestroy() {
    this.searchSubscription?.unsubscribe()
  }

  createDataSource() {
    this.incomingData = new TableDataSource(this.tableConfig.service!)
    this.incomingData.loadEntities()
    this.incomingData.meta.subscribe((data: any) => {
      this.dataSource.data = data
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    this.hasMatch = true
    this.filterValue = (event.target as HTMLInputElement).value;
    const filterValue = this.filterValue
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.filteredData.length == 0) this.hasMatch = false

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  buttonAction(from?: string, entity?: Record<string, any>) {
    this.btnEvent.emit({ from: from, data: entity });
  }

  addEntity() {
    this.btnEvent.emit('add');
  }

}

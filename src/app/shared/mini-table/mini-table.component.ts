import { Component, EventEmitter, Input, Output } from '@angular/core';
export interface Paginate_T {
  total: number;
  totalpages: number;
  size: number;
  currentPage: number
}


@Component({
  selector: 'app-mini-table',
  templateUrl: './mini-table.component.html',
  styleUrls: ['./mini-table.component.scss']
})


export class MiniTableComponent {


  @Input() cols: any[] = []
  @Input() items: any[] = []
  @Input() paginateObject: Paginate_T
  @Input() edit: boolean = false
  @Output() onPageChange = new EventEmitter<Paginate_T>();

  @Output() onEditClick = new EventEmitter<any>();

  constructor() {
    this.paginateObject = {
      size: 0,
      total: 0,
      totalpages: 0,
      currentPage: 0
    }
  }
  ngOnInit() {
    console.log('Init mini table');

  }



  ngOnChanges() {
    console.log('Changes mini table');
    console.log(this.items);
    console.log(this.paginateObject);

  }

  ngOnDestroy() {
    console.log('Destroy person');
  }

  changePage(page: number) {
    this.paginateObject.currentPage = page

    this.onPageChange.emit(this.paginateObject);
  }

  onEdit(item: any) {
    // console.log(item);
    this.onEditClick.emit(item);
  }
}

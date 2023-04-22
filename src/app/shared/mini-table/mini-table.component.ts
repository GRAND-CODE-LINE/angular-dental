import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mini-table',
  templateUrl: './mini-table.component.html',
  styleUrls: ['./mini-table.component.scss']
})
export class MiniTableComponent {


  @Input() cols: any[] = []
  @Input() items: any[] = []

  ngOnInit() {
    console.log('Init mini table');

  }



  ngOnChanges() {
    console.log('Changes mini table');
    console.log(this.items);
    console.log(this.cols);

  }

  ngOnDestroy() {
    console.log('Destroy person');
  }
}

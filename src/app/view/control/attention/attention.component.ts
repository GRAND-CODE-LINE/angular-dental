import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Procedure } from 'src/app/models/procedure';

@Component({
  selector: 'app-attention',
  templateUrl: './attention.component.html',
  styleUrls: ['./attention.component.scss']
})
export class AttentionComponent {
  Cols: any[] = [];
  items: any[] = [];
  @Input() edit: boolean = false
  @Input() delete: boolean = false
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log('Init');
    this.initCols();
  }

  initCols() {
    this.Cols = [
      { name: 'Nombre', field: 'persona', subfield: 'nombre' },
      { name: 'Apellido', field: 'persona', subfield: 'apaterno' },
      { name: 'DNI', field: 'persona', subfield: 'numeroDocumento' },
      { name: 'Genero', field: 'genero' }
    ];
  }

  ngOnChanges() {
    console.log('Changes');
  }

  ngOnDestroy() {
    console.log('Destroy person');
  }

  onEditClick(event: Procedure): void {

  }

  onDeleteClick(event: Procedure): void {
  }
}
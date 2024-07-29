import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { MenuComponent } from '../menu.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
  FormControl,
} from '@angular/forms';
import { Menu, MenuFilter } from 'src/app/models/menu';
import { List } from 'lodash';
import { MenuService } from 'src/app/services/menu/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { itemsType } from 'src/app/models/Person';
import { Message_I } from 'src/app/models/utils/message_i';
import { Paginate_I } from 'src/app/models/utils/filter_i';
import { Paginate_T } from 'src/app/shared/mini-table/mini-table.component';

@Component({
  selector: 'app-createmenu',
  templateUrl: './createmenu.component.html',
  styleUrls: ['./createmenu.component.scss'],
})
export class CreatemenuComponent implements OnInit, OnDestroy, OnChanges {
  documentType!: Observable<itemsType[]>;

  menu!: Menu;
  name!: string;
  listSubmenu: Menu[] = new Array();
  menuForm!: FormGroup;
  submenuForm!: FormGroup;
  modoEditar: Boolean = false;
  visible: boolean = false;
  constructor(
    private service: MenuService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  getDocumentType() {
    return this.http.get<itemsType[]>('assets/Documents/Documents.json');
  }

  ngOnInit() {
    this.initForms();
    if (this.route.snapshot.params['id'] != undefined) {
      const id = this.route.snapshot.paramMap.get('id')!;
      this.service.getById(id).subscribe((data: any) => this.Llenar(data));
    }
  }
  async create() {
    if (!this.modoEditar) {
      this.menu = this.menuForm.value;
      this.menu.subMenu = this.listSubmenu;
      await firstValueFrom(this.service.create(this.menu));
      this.goBack();
    } else {
      this.menu = this.menuForm.value;
      await firstValueFrom(this.service.create(this.menu));
      this.goBack();
    }
  }

  goBack() {
    this.router.navigate(['adm/menu']);
    console.log('called back');
  }

  initForms() {
    this.documentType = this.getDocumentType();
    this.menuForm = this.fb.group({
      id: [],
      name: [null, Validators.compose([Validators.required])],
    });
    this.submenuForm = this.fb.group({
      id: [],
      name: [null, Validators.compose([Validators.required])],
    });
  }

  openModal() {
    this.visible = true;
  }
  addSubmenu() {
    let submenu: Menu = this.submenuForm.value;
    console.log(submenu);
    this.listSubmenu.push(submenu);
    console.log(this.listSubmenu);
    console.log(this.menu.subMenu);
    this.menu.subMenu = this.listSubmenu;
    this.visible = false;
    this.submenuForm.reset();
  }

  ngOnChanges() {
    console.log('changes');
  }
  ngOnDestroy() {
    console.log('Destroy Menu');
  }
  Llenar(data: Menu) {
    this.menuForm.patchValue(data);
    this.menu = data;
    if (this.menu.subMenu) {
      this.menu.subMenu.forEach((child) => {
        this.listSubmenu.push(child);
      });
    }
  }
  editMenu(item: Menu) {
    this.submenuForm.patchValue(item);
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/services/role/role.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.scss'
})
export class CreateRoleComponent {

  role!: Role;
  roleForm!: FormGroup;
  edit = false;
  constructor(
    private roleService: RoleService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit(): Promise<void> {
   
    this.initForms();
    if (this.route.snapshot.params['id'] != undefined) {
      this.edit = true;
      await this.getUserByUsername(this.route.snapshot.params['id']);
    }
  }

  initForms() {
    this.roleForm = this.fb.group({
      id: [],
      name: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
    });
  }

  async getUserByUsername(id: string) {
    let userGet: Role = await firstValueFrom(this.roleService.getById(id)) as Role;
    console.log(userGet);
    this.roleForm.patchValue(userGet);
  }

  async create() {
    if (!this.roleForm.valid) {
      return;
    }
    this.role = this.roleForm.value;
    console.log(this.role);

    await firstValueFrom(this.roleService.create(this.role));
    this.router.navigate(['securityadm/role']);
  }


  async update() {
    console.log('edita');

    this.role = this.roleForm.value;
    
    await firstValueFrom(this.roleService.update(this.role.id, this.role));
    this.router.navigate(['securityadm/role']);
  }

  saveData() {
    console.log('aaaaaaaaaaaaaaaa');
    console.log(this.edit);
    console.log(this.roleForm);

    if (this.edit) {
      this.update();
    } else {
      this.create();
    }
  }

  back() { }


}

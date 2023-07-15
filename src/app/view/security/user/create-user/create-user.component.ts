import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

  user!: User;
  userForm!: FormGroup;

  edit = false

  personform!: FormGroup;
  constructor(private userService: UserService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }


  async ngOnInit(): Promise<void> {
    this.initForms();
    if (this.route.snapshot.params['id'] != undefined) {
      this.edit = true;
      await this.getUserById(this.route.snapshot.params['id'])
    }

  }


  initForms() {
    this.userForm = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      reppassword: [null, Validators.compose([Validators.required])],
    })
    

    this.personform = this.fb.group({
      nombre: [null, Validators.compose([Validators.required])],
      apaterno: [null, Validators.compose([Validators.required])],
      amaterno: [null, Validators.compose([Validators.required])],
      direccion: [null, Validators.compose([])],
      telefono: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      tipoDocumento: [null, Validators.compose([Validators.required])],
      numeroDocumento: [null, Validators.compose([Validators.required, Validators.maxLength(8)])],
      fechaNacimiento: [null, Validators.compose([Validators.required])]
    })

  }

  async getUserById(id: string) {
    let userGet: any = await firstValueFrom(this.userService.getById(id));
    console.log(userGet);
    this.userForm.patchValue(userGet)
  }

  async create() {
    this.user = this.userForm.value;
    await firstValueFrom(this.userService.create(this.user));
    this.router.navigate(['securityadm/user'])

  }

  async update() {
    this.user = this.userForm.value;
    await firstValueFrom(this.userService.update(this.user.id, this.user));
    this.router.navigate(['securityadm/user'])
  }

  saveData() {
    if (this.edit) {
      this.update();
    } else {
      this.create();
    }
  }

  back() {

  }
}

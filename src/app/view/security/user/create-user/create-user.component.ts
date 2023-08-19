import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Person } from 'src/app/models/Person';
import { User } from 'src/app/models/user';
import { PersonService } from 'src/app/services/person/person.service';
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

  documentTypePerson = [
    { value: 'DNI', label: 'Documento de identidad' }
  ]

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private personService: PersonService) { }


  async ngOnInit(): Promise<void> {
    this.initForms();
    if (this.route.snapshot.params['id'] != undefined) {
      this.edit = true;
      await this.getUserById(this.route.snapshot.params['id'])
    }

  }


  initForms() {
    this.userForm = this.fb.group({
      id: [],
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
    this.personform.patchValue(userGet.person)
  }

  async create() {
    if (!this.userForm.valid) {
      return
    }


    this.user = this.userForm.value;
    this.user.person = this.personform.value

    console.log(this.user);

    await firstValueFrom(this.userService.create(this.user));
    this.router.navigate(['securityadm/user'])

  }

  async update() {
    this.user = this.userForm.value;
    this.user.person = this.personform.value
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


  async searchPerson() {
    let person = this.personform.value;
    let res: any = await firstValueFrom(this.personService.getByDocument(person.numeroDocumento)) as Person;

    let personGet: Person = res;
    console.log(personGet);

    if (personGet) {
      this.personform.patchValue(personGet)
    }
    // personGet.fechaNacimiento = personGet.fechaNacimiento.substring(0, 10);
  }
}

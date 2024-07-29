import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { observeNotification } from 'rxjs/internal/Notification';
import { Person, itemsType } from 'src/app/models/Person';
import { User } from 'src/app/models/user';
import { PersonService } from 'src/app/services/person/person.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  user!: User;
  userForm!: FormGroup;
  edit = false;
  documentType!: Observable<itemsType[]>;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private personService: PersonService,
    private http: HttpClient
  ) { }

  async ngOnInit(): Promise<void> {
    this.documentType = this.getDocumentType();
    this.initForms();
    if (this.route.snapshot.params['id'] != undefined) {
      this.edit = true;
      await this.getUserByUsername(this.route.snapshot.params['id']);
    }
  }

  initForms() {
    this.userForm = this.fb.group({
      id: [],
      username: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      reppassword: [null, Validators.compose([Validators.required])],
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])]
    });
  }

  async getUserByUsername(username: string) {
    let userGet: User[] = await firstValueFrom(this.userService.getByUsername(username)) as User[];
    console.log(userGet);
    this.userForm.patchValue(userGet[0]);
  }

  async create() {
    if (!this.userForm.valid) {
      return;
    }

    this.user = this.userForm.value;
    // this.user.person = this.personform.value;

    console.log(this.user);

    await firstValueFrom(this.userService.create(this.user));
    this.router.navigate(['securityadm/user']);
  }
  getDocumentType() {
    return this.http.get<itemsType[]>('assets/data/documenttype.json');
  }

  async update() {
    console.log('edita');

    this.user = this.userForm.value;
    
    await firstValueFrom(this.userService.update(this.user.id, this.user));
    this.router.navigate(['securityadm/user']);
  }

  saveData() {
    console.log('aaaaaaaaaaaaaaaa');
    console.log(this.edit);
    console.log(this.userForm);

    if (this.edit) {
      this.update();
    } else {
      this.create();
    }
  }

  back() { }


}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Symbol } from 'src/app/models/symbol';
import { SymbolService } from 'src/app/services/symbol/symbol.service';

@Component({
  selector: 'app-create-symbol',
  templateUrl: './create-symbol.component.html',
  styleUrls: ['./create-symbol.component.scss']
})
export class CreateSymbolComponent {

  symbol!: Symbol;
  symbolForm!: FormGroup;
  edit = false
  imageFile: any;

  groups = [
    { value: 'GRUPO 1', label: 'Grupo 1' }
  ]
  constructor(private symbolService: SymbolService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private sanitizer: DomSanitizer) { }


  async ngOnInit(): Promise<void> {
    this.initForms();
    if (this.route.snapshot.params['id'] != undefined) {
      this.edit = true;
      await this.getSymbolById(this.route.snapshot.params['id'])
    }

  }


  initForms() {
    this.symbolForm = this.fb.group({
      id: [],
      name: [null, Validators.compose([Validators.required])],
      active: [true, Validators.compose([Validators.required])],
      image: [null, Validators.compose([Validators.required])],
      acronym: [null],
      group: [null, Validators.compose([Validators.required])]
    })
  }

  async getSymbolById(id: string) {
    let userGet: any = await firstValueFrom(this.symbolService.getById(id));
    console.log(userGet);
    this.symbolForm.patchValue(userGet)
    this.imageFile = userGet.image

  }

  async create() {
    if (!this.symbolForm.valid) {
      return
    }
    this.symbol = this.symbolForm.value;
    console.log(this.symbol);
    await firstValueFrom(this.symbolService.create(this.symbol));
    this.router.navigate(['control/symbol'])
  }

  async update() {
    this.symbol = this.symbolForm.value;

    await firstValueFrom(this.symbolService.update(this.symbol.id, this.symbol));
    this.router.navigate(['control/symbol'])
  }

  saveData() {
    console.log(this.edit);

    if (this.edit) {
      console.log('edita');

      this.update();
    } else {
      this.create();
    }
  }

  public picked(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];

      this.imageFile = file;
      this.handleInputChange(file); //turn into base64

    }
    else {
      alert("No file selected");
    }
  }

  handleInputChange(files: any) {
    var file = files;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e: any) {
    let reader = e.target;
    var base64result = reader.result;
    this.imageFile = base64result;
    // console.log(this.imageFile);
    this.symbolForm.patchValue({ image: this.imageFile })
  }


  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.imageFile);
  }
}

import { Location } from '@angular/common';
import {
  Component,
  HostListener,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, firstValueFrom } from 'rxjs';
import { Attention } from 'src/app/models/attention';
import { Consultation } from 'src/app/models/consultation';
import { Patient } from 'src/app/models/patient';
import { Procedure } from 'src/app/models/procedure';
import { Symbol, SymbolFilter } from 'src/app/models/symbol';
import { Paginate_I } from 'src/app/models/utils/filter_i';
import { AttentionService } from 'src/app/services/attention/attention.service';
import { ConsultationService } from 'src/app/services/consultation/consultation.service';
import { PatientService } from 'src/app/services/patient/patient.service';
import { SymbolService } from 'src/app/services/symbol/symbol.service';
import * as _ from 'lodash';
import { ComponentCanDeactivate } from 'src/app/security/guards/PendingChangesGuard';

@Component({
  selector: 'app-attention',
  templateUrl: './attention.component.html',
  styleUrls: ['./attention.component.scss'],
})
export class AttentionComponent implements ComponentCanDeactivate {
  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
    // return true
    if (!this.edit) {
      return true;
    }
    return !this.checkForUnSaved();
  }
  modalRef?: BsModalRef;

  @ViewChild('modalActions') modalAction!: TemplateRef<any>;
  config = {
    animated: true,
    size: 'lg',
    class: 'modal-lg',
  };
  consultation: Consultation | undefined;
  patientGet: Patient | undefined;
  procedures: Procedure[] = [];
  procedureselected!: FormGroup;
  symbolsList: Symbol[] = [];
  selectedSymbol!: Symbol;
  attention!: Attention;
  edit = false;
  attentionOld: Attention | undefined;
  proceduresOld: Procedure[] = [];
  canEdit = true;
  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private location: Location,
    private fb: FormBuilder,
    private symbolService: SymbolService,
    private attentionService: AttentionService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.initAttention();
    this.getSymbols();
    console.log('Init');
    if (this.route.snapshot.params['id'] != undefined) {
      this.edit = true;
      await this.getAttentionById(this.route.snapshot.params['id']);
    } else {
      this.edit = false;
      let state = this.location.getState();
      this.consultation = state as unknown as Consultation;
      this.patientGet = this.consultation.patient;
    }

    this.procedureselected = this.fb.group({
      id: [null],
      name: [null, Validators.compose([Validators.required])],
      comments: [null],
    });
  }

  initAttention() {
    this.attention = {
      comments: '',
      status: 'Creado',
      procedures: [],
    };
    this.proceduresOld = _.clone(this.procedures);
    this.attentionOld = _.clone(this.attention);
  }

  async getAttentionById(id: any) {
    let res = await firstValueFrom(this.attentionService.getById(id));
    console.log(res);

    const attention: Attention = res as Attention;
    this.attention = attention;
    this.attentionOld = _.clone(this.attention);
    this.consultation = attention.consultation;
    this.patientGet = this.consultation?.patient;
    this.procedures = attention.procedures;
    this.proceduresOld = _.clone(this.procedures);

    if (this.consultation?.status == 'Cerrado') {
      this.canEdit = false;
    }
  }

  onProcedureClick() {
    this.modalRef = this.modalService.show(this.modalAction, this.config);
  }
  onAddProcedure() {
    if (this.procedureselected.invalid) {
      return;
    }

    let procedure: Procedure = this.procedureselected.value;
    procedure.symbol = this.selectedSymbol;
    this.procedures.push(procedure);
    this.procedureselected.reset();
    this.modalService.hide();
  }

  saveChanges() {
    if (this.edit) {
      this.updateAttention();
    } else {
      this.createAttention();
    }
  }

  async createAttention() {
    this.attention.procedures = this.procedures;
    this.attention.consultation = this.consultation;

    console.log(this.attention);
    let res = await firstValueFrom(
      this.attentionService.create(this.attention)
    );
    const attention: Attention = res as Attention;
    this.router.navigate(['control/attention/edit', attention.id]);
  }

  async updateAttention() {
    this.attention.procedures = this.procedures;
    this.attention.consultation = this.consultation;
    console.log(this.attention);
    let res = await firstValueFrom(
      this.attentionService.update(this.attention.id, this.attention)
    );
    const attention: Attention = res as Attention;
    this.router.navigate(['control/attention/edit', attention.id]);
    this.getAttentionById(this.attention.id);
  }

  reload() {
    this.getAttentionById(this.attention.id);
  }

  async getSymbols() {
    let filter: SymbolFilter = {
      page: 0,
      size: 100,
      sortOrder: 1,
      active: true,
    };
    let res: Paginate_I = await firstValueFrom(
      this.symbolService.paginate(filter)
    );

    this.symbolsList = res.content;
  }

  selectSymbol(item: Symbol) {
    this.selectedSymbol = item;
    let procedure: Procedure = {
      name: item.acronym ? item.acronym + ' - ' + item.name : item.name,
      status: 'Creado',
      symbol: item,
    };
    this.procedureselected.patchValue(procedure);
  }

  resetProcedure() {
    this.procedureselected.reset();
  }

  deleteProcedure(action: Procedure) {
    this.procedures = this.procedures.filter((x) => {
      return x.item !== action.item;
    });
  }

  checkForUnSaved() {
    if (
      !_.isEqual(this.attention, this.attentionOld) ||
      !_.isEqual(this.procedures, this.proceduresOld)
    ) {
      return true;
    } else {
      return false;
    }
  }

  backConsultation() {
    this.router.navigate(['control/consultation/edit', this.consultation?.id]);
  }

  async saveAndbackConsultation() {
    await this.saveChanges();

    this.router.navigate(['control/consultation/edit', this.consultation?.id]);
  }
}

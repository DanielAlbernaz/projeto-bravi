import {Component, Input} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormGroupDirective, FormArray } from '@angular/forms';
import { Person } from 'src/app/Person';
import { PersonService } from 'src/app/services/person.service';
import Swal from 'sweetalert2';
import { RefreshPeopleService } from 'src/app/services/refresh-people.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  displayedColumns: string[] = ['id', 'name', 'cpf', 'email', 'actions'];
  @Input() id: Number;
  @Input() form: String;
  personForm: FormGroup;
  person!: Person;
  title: String;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public dialog: MatDialog,
    private personService: PersonService,
    private refreshPeopleService: RefreshPeopleService
  ) {}

  ngOnInit(): void {
    this.title = 'Cadastro Pessoa';
    this.personForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      contacts: new FormArray([
        new FormGroup({
          type: new FormControl('', [Validators.required]),
          number: new FormControl('', [Validators.required]),
        })
      ])
    })
    if(this.form == 'edit'){
      this.getPerson();
    }
  }


  get contactControls () {
    return (<FormArray>this.personForm.get('contacts')).controls;
  }

  get name() {
    return this.personForm.get('name')!;
  }

  get email() {
    return this.personForm.get('email')!;
  }

  get cpf() {
    return this.personForm.get('cpf')!;
  }

  get type() {
    return this.personForm.get('type')!;
  }

  get number() {
    return this.personForm.get('number')!;
  }

  onSubmit(FormGroupDirective: FormGroupDirective) {
    console.log(this.personForm);
    if(this.personForm.invalid) {
        return
    }

    const data: Person = this.personForm.value;
    this.personService.createPerson(data).subscribe(
      response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cadastrado com sucesso!',
          showConfirmButton: false,
          timer: 1500
        })
        this.refreshPeopleService.refreshListPeople();
        this.dialogRef.close();
      }, err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Não foi possível cadastrar!'
        })
      }
    );
  }

  onAddContact() {
    const control = new FormGroup({
      type: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
    });
    (<FormArray>this.personForm.get('contacts')).push(control);
  }

  getPerson() {
    if(this.form == 'edit'){
      this.personService.getPerson(this.id).subscribe(((response) => {
        this.person = response;
        this.title = 'Editar Cadastro';
      }));
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}



import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PersonService } from 'src/app/services/person.service';
import { Person as People } from 'src/app/Person';
import { EditPersonComponent } from '../edit-person/edit-person.component';
import Swal from 'sweetalert2';
import { RefreshPeopleService } from 'src/app/services/refresh-people.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'cpf', 'email', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  animal: string;
  name: string;
  people: People[] = [];
  id: Number;
  form: String;

  constructor(
    public dialog: MatDialog,
    private personService: PersonService,
    private refreshPeopleService: RefreshPeopleService
  ) {
    this.getPeople();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {

  }

  ngOnInit() {
    this.refreshPeopleService.refreshList.subscribe(response => this.getPeople());
  }

  getPeople(): void {
    this.personService.getAll().subscribe((people) => {
      this.people = people
      this.list(this.people);
    });
  }

  confirmeDelete(id: number): void {
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Essa ação é irreversível!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.removePerson(id);
      }
    })
  }

  removePerson(id: number): void {
    this.personService.remove(id).subscribe(
      response => {
        this.people = this.people.filter((person) => id !== person.id);
        this.list(this.people);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Deletedo com sucesso!',
          showConfirmButton: false,
          timer: 1500
        })
      }, err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Não foi possível excluir!'
        })
      }
    );
  }

  list(people: People[]): void {
    this.dataSource = new MatTableDataSource(people)
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.nextPageLabel = 'Próximo';
    this.paginator._intl.previousPageLabel = 'Anterior';
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
  }

  openEditPerson(id: Number): void {
    const dialogRef = this.dialog.open(EditPersonComponent, {
      data: {id: id, form: 'edit'},
    });
    dialogRef.componentInstance.id = id;
    dialogRef.componentInstance.form = 'edit';
  }
}



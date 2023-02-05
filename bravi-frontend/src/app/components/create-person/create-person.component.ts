import { Component, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Person } from 'src/app/Person';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.css']
})
export class CreatePersonComponent {
  id: Number;
  name: String;
  cpf: String;
  email: String;

  constructor(public dialog: MatDialog) {}

   openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent);
  }

}





import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshPeopleService {

  @Output() refreshList: EventEmitter<any> = new EventEmitter();

  constructor() { }

  refreshListPeople(){
    this.refreshList.emit();
}
}

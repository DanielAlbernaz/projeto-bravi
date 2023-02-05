import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../Person';
// import { Response } from '../Response';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = 'http://54.152.39.164:8000/api/people/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl);
  }

  remove(id: number) {
    return this.http.delete<Person[]>(this.apiUrl + id);
  }

  createPerson(data: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, data);
  }

  getPerson(id: Number): Observable<Person> {
    return this.http.get<Person>(this.apiUrl + id);
  }

  updatePerson(data: Person, id: Number): Observable<Person> {
    return this.http.put<Person>(this.apiUrl + id, data);
  }
}

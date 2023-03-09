import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from './pet';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)

@Injectable({
  providedIn: 'root'
})

export class PetService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getAllPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.apiUrl}/animals`, { headers: headers });
  }

  public addPet(pet: Pet) :Observable<Pet> {
    return this.http.post<Pet>(`${this.apiUrl}/animals/add`, pet, { headers: headers });
  }

  public updatePet(pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiUrl}/animals/update`, pet, { headers: headers });
  }

  public finishedService(pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiUrl}/animals/finished-service`, pet, { headers: headers });
  }

  public deletePet(petId: number | undefined): Observable<Pet> {
    return this.http.delete<Pet>(`${this.apiUrl}/animals/delete/${petId}`, { headers: headers });
  }
}

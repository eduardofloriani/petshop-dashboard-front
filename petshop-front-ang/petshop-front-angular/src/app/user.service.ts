import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';

const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/`, { headers: headers })
  }
}

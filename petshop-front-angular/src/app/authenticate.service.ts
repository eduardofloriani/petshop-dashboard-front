import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Authenticate } from './authenticate';
import { Token } from './token';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthenticateService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public login(user: Authenticate): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}/auth/login`, user)
  }
}

import { Component, OnInit } from '@angular/core';
import { Authenticate } from 'src/app/authenticate';
import { AuthenticateService } from 'src/app/authenticate.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(
    private authenticateService: AuthenticateService,
    private userService: UserService,
    private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    localStorage.removeItem('token')
  }

  public onLogin(): void {
    const email = document.querySelector('input[name="email"]') as HTMLInputElement;
    const password = document.querySelector('input[name="password"]') as HTMLInputElement;
    const user: Authenticate = {
      email: email.value,
      password: password.value
    }

    const data = this.authenticateService.login(user);
    data.subscribe((res) => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['/dashboard'])
    }, (error) => {
      document.querySelector('.error-msg')?.classList.add('active');
    })
  };

}

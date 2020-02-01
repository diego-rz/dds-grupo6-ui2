import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  loginSuccess = true;
  loading = false;
  readonly expectedCredentialsFailMessage = 'Su usuario o password son invalidos';
  invalidCredentials: boolean;

  constructor(
    private restService: RestService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this.loading = true;
    this.restService.login(this.username, this.password).subscribe(
      response => {
        this.restService.setToken(response.token);
      },
      (error: HttpErrorResponse) => {
        this.loginSuccess = false;
        this.loading = false;
        this.invalidCredentials = error.error.message === this.expectedCredentialsFailMessage;
      },
      () => this.router.navigateByUrl('')
    )
  }

}

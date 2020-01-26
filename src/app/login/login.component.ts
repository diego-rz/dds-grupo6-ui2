import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  loginSuccess = true;
  constructor(
    private restService: RestService
  ) { }

  ngOnInit() {
  }

  login() {
    this.loginSuccess = this.restService.login(this.username, this.password)
  }

}

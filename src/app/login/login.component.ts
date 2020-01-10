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
  token = '';
  constructor(
    private restService: RestService
  ) { }

  ngOnInit() {
  }

  login() {
    this.restService.login(this.username, this.password);
  }

}

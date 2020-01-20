import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Closet } from '../model/closet';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-closet',
  templateUrl: './add-closet.component.html',
  styleUrls: ['./add-closet.component.css']
})
export class AddClosetComponent implements OnInit {

  constructor(
    private rest: RestService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  add(closetName: string): void {
    let owner: User = { // falta api para obtener usuario
      id: 23,
      nombre: "Juan",
      apellido: "Perez",
      username: "jperez",
      password: "qwer"
    };

    let closet = new Closet();
    closet.nombre = closetName;
    closet.propietario = owner;
    closet.prendas = [];

    this.rest.addCloset(closet).subscribe(() => {}, error => console.log(error), () => this.router.navigateByUrl('/closets'));
  }

}

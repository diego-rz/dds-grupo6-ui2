import { Component, OnInit, AfterViewInit } from '@angular/core';
import { wizard_class } from './main';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']

  
})
export class AddItemComponent implements  AfterViewInit {

  constructor() { }


  ngAfterViewInit() {
	 const calendar = new wizard_class();
    calendar.wizard_var();
 
  }

}

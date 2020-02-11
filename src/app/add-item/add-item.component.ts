import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemType } from '../model/itemType';
import { Closet } from '../model/closet';
import { RestService } from '../rest.service';
import { ItemDto } from '../model/item';
import { Router } from '@angular/router';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  @ViewChild(FileUploaderComponent, {static: false})
  private fileUploaderComponent: FileUploaderComponent;

  itemTypes: ItemType[];
  closets: Closet[];
  itemDto = new ItemDto();

  currentStep = 1;

  constructor(
    private rest: RestService,
    private router: Router
  ) { }

  ngOnInit() {
    this.rest.getClosets().subscribe(
      (closets) => this.closets = closets,
      (error) => console.log(error),
    );
    this.rest.getItemTypes().subscribe(
      (itemTypes) => this.itemTypes = itemTypes,
      (error) => console.log(error),
    );
  }

  addItem(): void {
    this.rest.addItem(this.itemDto).subscribe(
      () => {},
      (error) => console.log(error),
      () => this.router.navigateByUrl('items')
    )
  }

  uploadFile(): void {
    this.fileUploaderComponent.uploadFile(1234);
  }

  hasFile(): boolean {
    if(this.fileUploaderComponent) {
      return !!this.fileUploaderComponent.fileUploaded;
    }
    return false;
  }

  isLoading(): boolean {
    if(this.fileUploaderComponent) {
      return this.fileUploaderComponent.loading;
    } else {
      return false;
    }
  }

  back(): void {
    if(this.currentStep !== 1) {
      this.currentStep--;
    }
  }

  forward(): void {
    if(this.currentStep !== 2) {
      this.currentStep++;
    }
  }

  isComplete(): boolean {
    return this.itemDto &&
          this.itemDto.nombrePrenda &&
          this.itemDto.guardarropaID > 0 &&
          this.itemDto.tipoPrendaID > 0;
  }

  send(): void {

  }

}

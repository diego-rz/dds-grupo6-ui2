import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemType } from '../model/itemType';
import { Closet } from '../model/closet';
import { RestService } from '../rest.service';
import { ItemDto, Item } from '../model/item';
import { Router } from '@angular/router';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { Material } from '../model/idName';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit{
  @ViewChild(NotificationComponent, {static: false})
  notification: NotificationComponent

  @ViewChild(FileUploaderComponent, {static: false})
  private fileUploaderComponent: FileUploaderComponent;

  itemTypes: ItemType[];
  closets: Closet[];
  itemDto = new ItemDto();

  currentStep = 1;
  allowedMaterials: Material[] = [];

  constructor(
    private rest: RestService,
    private router: Router
  ) { }

  ngOnInit() {
    this.rest.getClosets().subscribe(
      (closets) => this.closets = closets,
      (error) => {console.log(error); this.notification.show()},
    );
    this.rest.getItemTypes().subscribe(
      (itemTypes) => this.itemTypes = itemTypes,
      (error) => {console.log(error); this.notification.show()},
    );
  }

  setAllowedMaterials(): void {
    let itemType: ItemType;
    for (const item of this.itemTypes) {
      if (+item.id === +this.itemDto.tipoPrendaID) {
        itemType = item;
      }
    }
    this.allowedMaterials = itemType ? itemType.materialesPermitidos : [];
  }

  addItem(): void {
    this.rest.addItem(this.itemDto).subscribe(
      () => {},
      (error) => {console.log(error); this.notification.show()},
      () => this.router.navigateByUrl('items')
    )
  }

  uploadFile(newItemId: number): void {
    if (newItemId) {
      this.fileUploaderComponent.uploadFile(newItemId);
    }
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
    this.formatColors();
    this.rest.addItem(this.itemDto).subscribe(
      (newItem: Item) => {
        if(newItem && newItem.id > 0) {
          this.uploadFile(newItem.id);
        } else {
          console.log("Invalid item response");
        }
      },
      error => {console.log(error); this.notification.show()}
    )
  }

  formatColors() {
    this.itemDto.colorPrincipal = this.hexToRgb(this.itemDto.colorPrincipal);
    this.itemDto.colorSecundario = this.hexToRgb(this.itemDto.colorSecundario);
  }

  hexToRgb(value: string): string {
    if (!value) {
      return value;
    }
    return value.substring(1,3) + '|' + value.substring(3,5) + '|' + value.substring(5,7) + '|1';
  }

}

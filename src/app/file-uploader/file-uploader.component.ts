import { Component, OnInit } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { RestService, host } from '../rest.service';
import { Router } from '@angular/router';

const URL = host + 'archivos';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  public uploader: FileUploader;
  fileUploaded: FileItem;
  loading = false;

  constructor(
    private rest: RestService,
    private router: Router
  ) {
    this.uploader = new FileUploader({
       url: URL, itemAlias: 'photo', authToken: rest.token,
       parametersBeforeFiles: true});
   }

  ngOnInit() {

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.fileUploaded = file;
      console.log(file);
      console.log(this.uploader.getNotUploadedItems());
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.fileUploaded = undefined;
      this.loading = false;
      this.router.navigateByUrl('items');
    };
  }

  uploadFile(prendaId: number) {
    if (this.uploader.getNotUploadedItems().length) {
      this.uploader.options.additionalParameter = {
        prendaId: prendaId
      };
      this.loading = true;
      this.uploader.uploadAll();
    }
  }

  clearFilesQueue() {
    this.uploader.clearQueue();
    this.fileUploaded = undefined;
    console.log(this.uploader.getNotUploadedItems());
  }

}

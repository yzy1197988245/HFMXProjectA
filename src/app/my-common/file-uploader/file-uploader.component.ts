import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest, HttpResponse} from "@angular/common/http";
import {ConfirmationService} from "primeng/api";
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  @Input('accept') accept:string;
  @Input('multiple') multiple:boolean = true;
  @Input('url') url:string = '';
  @Output('onUploadComplete') uploadComplete = new EventEmitter();
  inputId = Math.round(Math.random() * 10000).toString();
  files:UploadFile[] = [];
  currentUploadFileIndex = 0;
  isUploading = false;

  constructor(
    private http: HttpClient,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    // this.url = HttpService.base_url + 'api/upload-file';
  }

  chooseFile(event): void {
    event.preventDefault();
    document.getElementById(this.inputId).click();
  }

  inputChange(event) {
    let files = event.srcElement.files;
    if (this.multiple) {
      for (let file of files) {
        if (this.fileIndex(file) == -1)
          this.files.push(new UploadFile(file));
      }
    } else {
      this.files = [];
      this.files.push(new UploadFile(files[0]));
    }
    event.srcElement.value = '';
  }

  delete(file) {
    let index = this.files.indexOf(file);
    this.files.splice(index, 1);
  }

  fileIndex(file) {
    let index = -1;
    for (let i = 0; i < this.files.length; i++) {
      let temp = this.files[i];
      if (file.name == temp.fileData.name && file.lastModified == temp.fileData.lastModified && file.size == temp.fileData.size) {
        index = i;
        break;
      }
    }
    return index;
  }

  getCurrentStatus(file:UploadFile):string {
    switch (file.uploadStatus) {
      case -1:
        return '上传失败';
      case 0:
        return '等待中';
      case 1:
        return '上传中';
      case 2:
        return '上传成功';
      default:
        return '未知状态';
    }
  }

  upload():void {
    this.currentUploadFileIndex = -1;
    this.confirmationService.confirm({
      message: '上传将会花费一定的时间，请耐心等待！离开此页面或者有其他的操作都会影响上传进度。文件大小超过1GB，文件类型不符合要求或者上传时间超过30分钟都将导致上传失败！',
      accept: () => {
        this.isUploading = true;
        this.uploadNext();
      }
    });
  }

  private uploadNext():void {
    this.currentUploadFileIndex ++;
    if (this.currentUploadFileIndex < this.files.length) {
      let file = this.files[this.currentUploadFileIndex];
      if (file.uploadStatus == 2) {
        this.uploadNext();
        return;
      }
      file.uploadStatus = 1;
      let formData = new FormData();
      formData.append('fileData', file.fileData);
      let request = new HttpRequest('POST', this.url, formData, {reportProgress: true});
      this.http.request(request)
        .subscribe(
          (event) => {
            if (event instanceof HttpResponse) {
              file.uploadStatus = 2;
              file.responseData = event.body;
              this.uploadNext();
            } else if (event.type === HttpEventType.UploadProgress) {
              file.uploadProgress = Math.round(100 * event.loaded / event.total);
            }
          },
          (error) => {
            file.uploadStatus = -1;
            file.responseData = error.error;
            this.uploadNext();
          }
        )
    } else {
      this.isUploading = false;
      this.uploadComplete.emit(this.files);
    }
  }
}

export class UploadFile {
  public fileData;
  public uploadStatus = 0;
  public uploadProgress = 0;
  public responseData;
  public fileSize;

  constructor(file) {
    this.fileData = file;
    this.fileSize = Math.round(file.size/1048576*100)/100;
  }
}


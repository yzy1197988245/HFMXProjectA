import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {MessageService} from "../../services/message.service";
import {SourceViewerService} from "../../services/source-viewer.service";

@Component({
  selector: 'app-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss']
})
export class FileSelectorComponent implements OnInit {

  @Output() onCommit = new EventEmitter();
  @Input() selectedFiles = [];
  fileList = [];
  url;

  constructor(
    private httpService: HttpService,
    private messageService: MessageService,
    private sourceViewer: SourceViewerService
  ) {
    this.url = HttpService.base_url + 'api/upload-file'
  }

  ngOnInit() {
    this.getFileList();
  }

  uploadComplete():void {
    this.getFileList();
  }

  getFileList(): void {
    this.httpService.getFileList()
      .subscribe(
        (response) => {
          this.fileList = response;
        },
        (error) => {
          this.messageService.showDanger(error.error);
        }
      )
  }

  deleteFile(file):void {
    this.httpService.deleteFile(file.id)
      .subscribe(
        (response) => {
          this.messageService.showSuccess(response);
          this.getFileList();
        },
        (error) => {
          this.messageService.showDanger(error.error);
        }
      )
  }

  commit(): void {
    this.onCommit.emit(this.selectedFiles);
  }

  preview(): void {
    this.sourceViewer.showSourceViewer(this.fileList);
  }
}

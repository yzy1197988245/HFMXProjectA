import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {MessageService} from "../../services/message.service";
import {SourceViewerService} from "../../services/source-viewer.service";
import {ListItemAnimate} from "../../app.animations";

@Component({
  selector: 'app-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss'],
  animations: [ListItemAnimate]
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

  getListItemState(file): string {
    if (this.isSelected(file)) {
      return 'selected';
    } else {
      return 'normal'
    }
  }

  isSelected(file):boolean {
    for (let temp of this.selectedFiles) {
      if (file.id == temp.id)
        return true;
    }
    return false;
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

  selectFile(file): void {
    if (!this.isSelected(file)) {
      this.selectedFiles.push(file);
    } else {
       this.deselectFile(file);
    }
  }

  deselectFile(file): void {
    let index = -1;
    for (let i = 0; i < this.selectedFiles.length; i++) {
      if (file.id == this.selectedFiles[i].id) {
        index = i;
        break;
      }
    }
    if (index != -1) {
      this.selectedFiles.splice(index, 1);
    }
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
    console.log(this.selectedFiles);
    this.onCommit.emit(this.selectedFiles);
  }

  preview(): void {
    this.sourceViewer.showSourceViewer(this.fileList);
  }
}

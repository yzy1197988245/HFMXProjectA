import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {ActivatedRoute} from "@angular/router";
import "rxjs/add/operator/switchMap"
import {SourceViewerService} from "../../services/source-viewer.service";
import {UEditorComponent} from "ngx-ueditor";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-team-receipt',
  templateUrl: './team-receipt.component.html',
  styleUrls: ['./team-receipt.component.scss']
})
export class TeamReceiptComponent implements OnInit {

  url;
  teamId;
  teamInfo;
  members;
  isChooseFile;
  receiptFile = [];
  otherFiles = [];
  selectedFiles = [];
  fileSelectorTag = 0;
  calendarConfig;
  receiptDate;
  summary;
  @ViewChild('summaryEditor') summaryEditor: UEditorComponent;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private sourceService: SourceViewerService,
    private messageService: MessageService
  ) {
    this.route.paramMap.subscribe(params => {
      this.teamId = params.get('id');
    });
    this.calendarConfig = {
      firstDayOfWeek: 1,
      dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
      dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
      monthNames: [ "1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月" ],
      monthNamesShort: [ "1", "2", "3", "4", "5", "6","7", "8", "9", "10", "1", "12" ],
      today: '今天',
      clear: '清除'
    };
  }

  ngOnInit() {
    this.url = HttpService.base_url + 'api/upload-file';

    this.httpService.studentGetTeamBaseInfo(this.teamId)
      .subscribe(response => {
        this.teamInfo = response.teamInfo;
        this.members = response.members;
      });

    this.httpService.studentGetTeamReceipt(this.teamId)
      .subscribe(response => {
        this.receiptDate = response.receipt_date;
        this.summary = response.summary;
        this.receiptFile = JSON.parse(response.receipt_files);
        this.otherFiles = JSON.parse(response.other_files);
      });
  }

  chooseReceipt(): void {
    this.selectedFiles = this.receiptFile;
    this.fileSelectorTag = 0;
    this.isChooseFile = true;
  }

  chooseOtherFiles(): void {
    this.selectedFiles = this.otherFiles;
    this.fileSelectorTag = 1;
    this.isChooseFile = true;
  }

  fileSelected(event): void {
    this.isChooseFile = false;
    if (this.fileSelectorTag == 0) {
      this.receiptFile = event;
    } else {
      this.otherFiles = event;
    }
  }

  previewReceiptFiles(): void {
    this.sourceService.showSourceViewer(this.receiptFile);
  }

  previewOtherFiles(): void {
    this.sourceService.showSourceViewer(this.otherFiles);
  }

  commitOrUpdateTeamReceipt(): void {
    if (!this.receiptDate || this.receiptDate == '') {
      this.messageService.showDanger('请选择回访日期！！');
      return;
    }
    if (this.summaryEditor.Instance.getContent().length < 100) {
      this.messageService.showDanger('活动小结内容过少！！！');
      return;
    }
    if (this.receiptFile.length < 1) {
      this.messageService.showDanger('请选择回执文件');
      return;
    }

    let receipt = {
      'id': this.teamId,
      'receiptDate': this.receiptDate,
      'summary': this.summaryEditor.Instance.getContent(),
      'receiptFiles': JSON.stringify(this.receiptFile),
      'otherFiles': JSON.stringify(this.otherFiles)
    };
    this.httpService.studentCreateOrUpdateReceipt(receipt)
      .subscribe(() => {
        this.messageService.showSuccess('提交成功！');
      }, () => {
        this.messageService.showDanger('提交失败！');
      })
  }
}

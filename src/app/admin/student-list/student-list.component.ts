import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";
import {MessageService} from "../../services/message.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {StudentDialogComponent} from "../student-dialog/student-dialog.component";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  progress = 0;
  studentList;
  queryParams: FormGroup;
  currentPage = 1;
  pageSize = 15;
  totalCount = 0;
  pageSizeOptions = [10, 15, 20, 50, 100];

  constructor(
    private httpService: HttpService,
    // private notificationService: NotificationService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private confirmationService: ConfirmationService
  ) {
    this.queryParams = formBuilder.group({
      'page': [this.currentPage],
      'pageSize': [this.pageSize],
      'xh': [null],
      'xm': [null]
    });
  }

  ngOnInit() {
    // this.notificationService.receiveMessage((message) => {
    //   this.progress = message.data;
    // });

    this.getStudentList();
  }

  syncStudentInfo(): void {
    this.confirmationService.confirm({
      message: '确定启动同步数据？同步数据将花费大量时间！',
      accept: () => {
        this.httpService.adminSyncStudentInfo()
          .then(res => {
            if (res.code == 200) {
              this.messageService.showSuccess(res.message);
            }
          }).catch(() => {
            this.messageService.showWarning('同步失败！出现异常');
        })
      }
    });
  }

  searchStudent(): void {
    this.currentPage = 1;
    this.getStudentList();
  }

  getStudentList(): void {
    const queryParams = this.queryParams.value;
    this.httpService.adminGetStudentList(queryParams)
      .then(res => {
        this.studentList = res.data;
        this.currentPage = res.current_page;
        this.pageSize = res.per_page;
        this.totalCount = res.total;
      })
  }

  pageChanged(event): void {
    this.queryParams.controls['page'].setValue(event.page);
    this.queryParams.controls['pageSize'].setValue(event.itemsPerPage);
    this.getStudentList();
  }

  createStudent(): void {
    const dialogRef = this.matDialog.open(StudentDialogComponent, {
      width: '500px',
      data: '-1'
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res === 'update')
        this.getStudentList();
    })
  }

  showStudentDetail(id): void {
    const dialogRef = this.matDialog.open(StudentDialogComponent, {
      width: '500px',
      data: id
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res === 'update')
        this.getStudentList();
    })
  }
}

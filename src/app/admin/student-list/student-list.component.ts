import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";
import {NotificationService} from "../../services/notification.service";
import {MessageService} from "../../services/message.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatPaginatorIntl} from "@angular/material";

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
    private matPaginatorInt: MatPaginatorIntl,
  ) {
    matPaginatorInt.nextPageLabel = '下一页';
    matPaginatorInt.previousPageLabel = '上一页';
    matPaginatorInt.itemsPerPageLabel = '每页显示';
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
    this.httpService.adminSyncStudentInfo()
      .then(res => {
        if (res.code == 200) {
          this.messageService.showSuccess(res.message);
        }
      })
  }

  searchStudent(): void {
    this.getStudentList();
  }

  getStudentList(): void {
    const queryParams = this.queryParams.value;
    this.httpService.adminGetStudentList(queryParams)
      .then(res => {
        this.studentList = res.data;
        this.totalCount = res.total;
        this.currentPage = res.current_page;
        this.pageSize = res.per_page;
      })
  }

  pageChanged(event): void {
    this.queryParams.controls['page'].setValue(event.pageIndex + 1);
    this.queryParams.controls['pageSize'].setValue(event.pageSize);
    this.getStudentList();
  }

  createStudent(): void {

  }
}

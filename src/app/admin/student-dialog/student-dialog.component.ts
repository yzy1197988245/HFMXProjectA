import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {HttpService} from "../../services/http.service";
import {MessageService} from "../../services/message.service";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.scss']
})
export class StudentDialogComponent implements OnInit {

  studentInfoForm: FormGroup;
  studentId;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService,
    private messageService: MessageService,
    private confirmService: ConfirmationService
  ) {
    this.studentInfoForm = formBuilder.group({
      'id': [data, Validators.required],
      'xh': ['', [Validators.required]],
      'xm': ['', [Validators.required]],
      'xy': ['', [Validators.required]],
      'bj': ['', [Validators.required]],
      'zy': ['', [Validators.required]],
      'sfzh': ['', [Validators.required]],
      'byzx': ['', [Validators.required]]
    });
    this.studentId = data;
  }

  ngOnInit() {
    if (this.studentId != -1) {
      this.httpService.adminGetStudentInfo(this.studentId)
        .then(res => {
          this.studentInfoForm.setValue(res);
        })
        .catch(() => {
          this.messageService.showDanger('获取学生信息失败！');
          this.dialogRef.close('error');
        });
    }
  }

  close() {
    this.dialogRef.close('cancel');
  }

  commit() {
    this.httpService.adminCreateOrUpdateStudent(this.studentInfoForm.value)
      .then(res => {
        this.messageService.showInfo(res);
        this.dialogRef.close('update');
      }).catch(() => {
      this.messageService.showWarning('提交失败！');
    })
  }

  delete() {
    this.confirmService.confirm({
      message: '确定删除？',
      accept: () => {
        this.httpService.adminDeleteStudent(this.studentId)
          .then(res => {
            this.messageService.showInfo(res);
            this.dialogRef.close('update');
          }).catch(res => {
          this.messageService.showWarning('删除失败！')
        });
      }
    });
  }
}

import {Component, OnInit} from '@angular/core';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {HttpService} from "../../http.service";
import {MatDialog, MatDialogRef} from "@angular/material";
import {AuthService} from "../../auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "../../my-common/message.service";

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {

  zxOptions = [];
  sfOptions = [];
  searchTask;
  members = [];
  teamForm: FormGroup;
  preview = true;
  teamId;
  loading = true;


  constructor(
    private httpService: HttpService,
    private dialog: MatDialog,
    private messageService: MessageService,
    public authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.teamForm = this.formBuilder.group({
      xh: [ this.authService.userInfo['xh'], [ Validators.required ] ],
      xm: [ this.authService.userInfo['xm'], [ Validators.required ] ],
      bj: [ this.authService.userInfo['bj'], [ Validators.required ] ],
      phone: [ null, [ Validators.required ] ],
      hfzx: [ null, [ Validators.required ] ],
      sf: [ null, [ Validators.required ] ],
      hdjh: [ null, [ Validators.required ] ],
      sbys: [ null, [ Validators.required ] ]
    });
  }

  ngOnInit() {
    this.httpService.sfOptions().then(response => {
      this.sfOptions = response.data;
    });
    this.httpService.checkMember(this.authService.userInfo.xh)
      .then(response => {
        if (response.code == 100) {
          this.teamId = response.data;
          this.httpService.getTeamDetail(this.teamId)
            .then(response => {
              this.preview = true;
              this.loading = false;
              this.members = response.data.members;
              this.teamForm.setValue(response.data.team);
            });
        } else {
          this.loading = false;
          this.preview = false;
        }
      });
  }

  searchZx(searchText) {
    clearTimeout(this.searchTask);
    this.searchTask = setTimeout(() => {
      this.httpService.zxOptions(searchText).then(response => {
        this.zxOptions = response.data;
      });
    }, 250);
  }

  addMember(): void {
    let dialogRef = this.dialog.open(AddMemberDialog, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result!=null && !this.memberExist(result)) {
        if (result.xh == this.authService.userInfo.xh) {
          this.messageService.showDanger('不能添加自己为成员!');
        } else {
          this.httpService.checkMember(result.xh).then(response => {
            if (response.code == 200) {
              this.members.push(result);
            } else {
              this.messageService.showDanger('该成员已有团队，添加失败!')
            }
          });
        }
      }
    });
  }

  memberExist(member): boolean {
    for (let tempMember of this.members) {
      if (member.xh == tempMember.xh)
        return true;
    }
    return false;
  }

  deleteMember(member: FormControl): void {
    let index = this.members.indexOf(member);
    console.log(index);
    this.members.splice(index, 1);
  }

  commit(): void {
    let params = {
      team: this.teamForm.value,
      members: this.members
    };
    this.httpService.createTeam(params)
      .then(response => {
        if (response.code == 200) {
          this.messageService.showSuccess('提交申请成功!');
          this.teamId = response.data;
          this.preview = true;
        } else {
          this.messageService.showDanger(response.message);
        }
      });
  }

  canEdit(): boolean {
    return this.preview && this.authService.userInfo.xh == this.teamForm.value.xh;
  }

  updateTeam(): void {
    let params = {
      teamId: this.teamId,
      team: this.teamForm.value,
      members: this.members
    };
    this.httpService.updateTeam(params)
      .then(response => {
        if (response.code == 200) {
          this.preview = true;
          this.messageService.showSuccess('更新成功!');
        } else {
          this.messageService.showDanger(response.message);
        }
      });
  }

  deleteTeam():void {
    this.httpService.deleteTeam(this.teamId)
      .then(response => {
        if (response.code == 200) {
          this.messageService.showSuccess('取消报名成功!');
          this.teamId = null;
          this.preview = false;
        } else {
          this.messageService.showDanger('取消报名失败!');
        }
      })
  }

  reset(): void {
    this.members = [];
    this.teamForm.setValue({
      xm: this.authService.userInfo.xm,
      xh: this.authService.userInfo.xh,
      bj: this.authService.userInfo.bj,
      phone: null,
      hfzx: null,
      sf: null,
      hdjh: '',
      sbys: ''
    });
  }
}

@Component({
  templateUrl: './add-member-dialog.html',
  styleUrls: ['./add-member-dialog.scss']
})
export class AddMemberDialog implements OnInit{

  xsOptions = [];
  searchTask;
  memberForm: FormGroup;
  userInput: FormControl;

  constructor(
    private dialogRef: MatDialogRef<AddMemberDialog>,
    private httpService: HttpService,
    private formBuilder: FormBuilder
  ) {
    this.memberForm = this.formBuilder.group({
      xm: [ null, [ Validators.required ] ],
      xh: [ null, [ Validators.required ] ],
      phone: [ null, [ Validators.required ] ],
      bj: [null, [Validators.required] ],
    });
    this.userInput = new FormControl(null, [ Validators.required ]);
  }

  ngOnInit() {

  }

  close() {
    this.dialogRef.close();
  }

  commit() {
    this.dialogRef.close(this.memberForm.value);
  }

  memberString(member):string {
    return member.xh + ',' + member.xm + ',' + member.bj;
  }

  searchXs(searchText) {
    clearTimeout(this.searchTask);
    this.searchTask = setTimeout(() => {
      this.httpService.xsOptions(searchText).then(response => {
        this.xsOptions = response.data;
      });
    }, 250);
  }

  studentSelected(student) {
    let studentInfos = student.split(',');
    this.memberForm.controls['xh'].setValue(studentInfos[0]);
    this.memberForm.controls['xm'].setValue(studentInfos[1]);
    this.memberForm.controls['bj'].setValue(studentInfos[2]);
  }
}

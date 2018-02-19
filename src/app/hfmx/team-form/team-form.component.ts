import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {UEditorComponent} from "ngx-ueditor";
import {MatDialog} from "@angular/material";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {MessageService} from "../../services/message.service";
import {AddMemberDialogComponent} from "./add-member-dialog/add-member-dialog.component";

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent implements OnInit {

  zxOptions = [];
  sfOptions = [];
  searchTask;
  members = [];
  teamForm: FormGroup;
  hdjhValue = '';
  sbysValue = '';

  @ViewChild('hdjh') hdjh: UEditorComponent;
  @ViewChild('sbys') sbys: UEditorComponent;

  constructor(
    private httpService: HttpService,
    private dialog: MatDialog,
    public authService: AuthService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
  ) {
    this.teamForm = this.formBuilder.group({
      xh: [ this.authService.userInfo['xh'], [ Validators.required ] ],
      xm: [ this.authService.userInfo['xm'], [ Validators.required ] ],
      bj: [ this.authService.userInfo['bj'], [ Validators.required ] ],
      phone: [ '', [ Validators.required, Validators.maxLength(11), Validators.minLength(11) ] ],
      hfzx: [ '', [ Validators.required ] ],
      sf: [ '', [ Validators.required ] ],
      hdjh: [ '' ],
      sbys: [ '' ]
    });
  }

  ngOnInit() {
    this.httpService.sfOptions().then(response => {
      this.sfOptions = response.data;
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
    let dialogRef = this.dialog.open(AddMemberDialogComponent, {
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
    this.members.splice(index, 1);
  }

  saveContent(): void {
    this.teamForm.controls['hdjh'].setValue(this.hdjh.Instance.getContent());
    this.teamForm.controls['sbys'].setValue(this.sbys.Instance.getContent());
  }

  showContent(): void {
    this.hdjhValue = this.teamForm.value.hdjh;
    this.sbysValue = this.teamForm.value.sbys;
  }

  setFormValue(value): void {
    this.members = value.members;
    this.teamForm.setValue(value.team);
    this.showContent();
  }

  getFormValue(): any {
    this.saveContent();
    return {
      team: this.teamForm.value,
      members: this.members
    }
  }

  resetForm(): void {
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
    this.showContent();
  }
}

import {AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TeamFormComponent} from "../team-form/team-form.component";
import {HttpService} from "../../services/http.service";
import {MessageService} from "../../services/message.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit,AfterViewInit {

  @ViewChild('teamForm') teamFormComponent: TeamFormComponent;
  teamForm:FormGroup;

  constructor(
    private httpService: HttpService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.teamForm = this.teamFormComponent.teamForm;
  }

  commit(): void {
    let formValue = this.teamFormComponent.getFormValue();
    if (formValue.team.hdjh.length < 100) {
      this.messageService.showDanger('活动计划内容过少');
      return;
    }
    if (formValue.team.sbys.length < 100) {
      this.messageService.showDanger('申报优势内容过少！');
      return;
    }
    this.httpService.createTeam(formValue)
      .then(() => {
        this.messageService.showSuccess('提交成功！');
      })
      .catch(() => {
        this.messageService.showDanger('提交失败，出现异常');
      })
  }

  reset(): void {
    // this.teamForm.resetForm();
  }

}

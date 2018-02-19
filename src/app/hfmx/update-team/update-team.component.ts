import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "../../services/message.service";
import {TeamFormComponent} from "../team-form/team-form.component";

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.scss']
})
export class UpdateTeamComponent implements OnInit {

  @ViewChild('teamForm') teamFormComponent: TeamFormComponent;
  teamId;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.route.paramMap.subscribe((param) => {
      this.teamId = param.get('id');
    });
  }

  ngOnInit() {
    this.httpService.getTeamDetail(this.teamId)
      .then(response => {
        this.teamFormComponent.setFormValue(response.data);
      });
  }

  commit() {
    let formValue = this.teamFormComponent.getFormValue();
    if (formValue.team.hdjh.length < 100) {
      this.messageService.showDanger('活动计划内容过少');
      return;
    }
    if (formValue.team.sbys.length < 100) {
      this.messageService.showDanger('申报优势内容过少！');
      return;
    }
    let params = {
      'teamId': this.teamId,
      'teamInfo': formValue.team,
      'members': formValue.members
    };
    this.httpService.updateTeam(params)
      .then(() => {
        this.messageService.showSuccess('提交成功！');
      })
      .catch(() => {
        this.messageService.showDanger('提交失败，出现异常');
      })
  }

}

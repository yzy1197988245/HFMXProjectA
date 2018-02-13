import {Component, OnInit, ViewChild} from '@angular/core';
import {TeamFormComponent} from "../team-form/team-form.component";
import {HttpService} from "../../services/http.service";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {

  @ViewChild('teamForm') teamForm: TeamFormComponent;

  constructor(
    private httpService: HttpService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  commit(): void {
    console.log(this.teamForm.getFormValue());
    this.httpService.createTeam(this.teamForm.getFormValue())
      .then(res => {
        this.messageService.showSuccess('提交成功！');
      })
      .catch(() => {
        this.messageService.showDanger('提交失败，出现异常');
      })
  }

  reset(): void {
    this.teamForm.resetForm();
  }

}

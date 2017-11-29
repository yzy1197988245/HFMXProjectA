import {Component, OnInit, ViewChild} from '@angular/core';
import {TeamFormComponent} from "../team-form/team-form.component";

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {

  @ViewChild('teamForm') teamForm: TeamFormComponent;

  constructor() { }

  ngOnInit() {
  }

  commit(): void {
    console.log(this.teamForm.getFormValue());
  }

  reset(): void {
    this.teamForm.resetForm();
  }

}

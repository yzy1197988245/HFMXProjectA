import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  teamList;
  currentTeam;
  showDetail = false;

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.httpService.adminGetTeamList()
      .then(response => {
        this.teamList = response.data;
      })
  }

  previewTeamDetail(currentTeam):void {
    this.currentTeam = currentTeam;
    this.showDetail = true;
  }

  isSelected(team): boolean {
    if (this.currentTeam == null)
      return false;
    return team.id == this.currentTeam.id;
  }

  detailClosed(team): void {
    this.currentTeam = team;
    // console.log(team);
    this.showDetail = false;
  }
}

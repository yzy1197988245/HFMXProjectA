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
  xyList = ['资源', '地测', '化环', '机电', '管理', '力建', '理', '文法'];
  currentXy;

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.getList();
  }

  getList(): void {
    let params = {
      xy: this.currentXy
    };
    this.httpService.adminGetTeamList(params)
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
    this.showDetail = false;
  }

  exportList(): void {
    window.open(HttpService.base_url + 'api/team/admin-export-teams-to-excel');
  }
}


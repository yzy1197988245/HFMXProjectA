import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material";
import {TeamInfoComponent} from "../team-info/team-info.component";

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  teamList;

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.httpService.studentGetTeamList(this.authService.userInfo.xh)
      .then(response => {
        this.teamList = response;
      })
  }

  showTeamDetail(team) {
    this.matDialog.open(TeamInfoComponent, {
      data: team.id,
      width: '1000px',
      height: '100%'
    })
  }
}

import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  teamList;

  constructor(
    private httpService: HttpService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.httpService.studentGetTeamList(this.authService.userInfo.xh)
      .then(response => {
        this.teamList = response;
      })
  }
}

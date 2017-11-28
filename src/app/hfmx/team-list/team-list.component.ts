import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  teams1;
  teams2;

  constructor(
    private httpService: HttpService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.httpService.studentGetTeamList(this.authService.userInfo.xh)
      .then(response => {
        if (response.code == 200) {
          this.teams1 = response.data.teams1;
          this.teams2 = response.data.teams2;
        }
      })
  }

}

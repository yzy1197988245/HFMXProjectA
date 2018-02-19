import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {HttpService} from "../../services/http.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss']
})
export class TeamInfoComponent implements OnInit {

  teamId;
  members;
  teamInfo;
  hdjh: SafeHtml;
  sbys: SafeHtml;

  constructor(
    public dialogRef: MatDialogRef<TeamInfoComponent>,
    private httpService: HttpService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private domSanitizer:DomSanitizer,
  ) {
    this.teamId = data;
    dialogRef.afterOpen().subscribe(() => {
      this.httpService.getTeamDetail(this.teamId)
        .then((response) => {
          this.teamInfo = response.data.team;
          this.members = response.data.members;
          this.hdjh = this.domSanitizer.bypassSecurityTrustHtml(this.teamInfo.hdjh);
          this.sbys = this.domSanitizer.bypassSecurityTrustHtml(this.teamInfo.sbys);
        })
    })
  }

  ngOnInit() {
  }

}

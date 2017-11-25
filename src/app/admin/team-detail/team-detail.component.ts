import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {SessionStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss'],
  animations: [
    trigger('transform', [
      state('hide', style({transform: 'scale(0, 0)'})),
      state('show', style({transform: 'scale(1, 1)'})),
      transition('* => show', [
        style({transform: 'scale(0, 0)'}),
        // animate(200, style({transform: 'scale(1, 1)'})),
        animate(200)
      ]),
      transition('* => hide', [
        animate(200, style({transform: 'scale(0, 0)'})),
        // animate(200, style())
      ])
    ])
  ]
})
export class TeamDetailComponent implements OnInit {

  @Input() teamList = [];
  @Input() currentTeam;
  @Output() closed = new EventEmitter<any>();
  teamInfo;
  hdjh: SafeHtml;
  sbys: SafeHtml;
  currentState = 'show';
  currentIndex;

  constructor(
    private httpService: HttpService,
    private domSanitizer:DomSanitizer,
    private sessionService: SessionStorageService
  ) { }

  ngOnInit() {
    // let team = this.teamList[this.currentIndex];
    if (this.teamList != null && this.currentTeam != null) {
      for (let i = 0; i < this.teamList.length; i++) {
        if (this.teamList[i].id == this.currentTeam.id) {
          this.currentIndex = i;
          break;
        }
      }
      this.getTeamInfo();
    }
  }

  getTeamInfo(): void {
    this.teamInfo = this.sessionService.retrieve('teamInfo' + this.currentTeam.id);
    if (this.teamInfo != null) {
      this.hdjh = this.domSanitizer.bypassSecurityTrustHtml(this.teamInfo.hdjh);
      this.sbys = this.domSanitizer.bypassSecurityTrustHtml(this.teamInfo.sbys);
    }
    if (this.teamInfo == null) {
      this.httpService.adminGetTeamInfo(this.currentTeam.id)
        .then(response => {
          if (response.code == 200) {
            this.teamInfo = response.data;
            this.hdjh = this.domSanitizer.bypassSecurityTrustHtml(response.data.hdjh);
            this.sbys = this.domSanitizer.bypassSecurityTrustHtml(response.data.sbys);
            this.sessionService.store('teamInfo' + this.currentTeam.id, response.data);
          }
        });
    }

  }

  next(): void {
    if (this.currentIndex < this.teamList.length - 1) {
      this.currentIndex ++;
    } else {
      this.currentIndex = 0;
    }
    this.currentTeam = this.teamList[this.currentIndex];
    this.getTeamInfo();
  }

  previous(): void {
    if (this.currentIndex > 0) {
      this.currentIndex --;
    } else {
      this.currentIndex = this.teamList.length - 1;
    }
    this.currentTeam = this.teamList[this.currentIndex];
    this.getTeamInfo();
  }

  close(): void {
    this.currentState = 'hide';
  }

  animateDone(): void {
    if (this.currentState == 'hide')
      this.closed.emit(this.currentTeam);
  }
}

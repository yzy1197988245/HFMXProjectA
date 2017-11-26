import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  @Input() teamInfo;
  @Input() members;
  hdjh: SafeHtml;
  sbys: SafeHtml;

  constructor(
    private domSantizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.hdjh = this.domSantizer.bypassSecurityTrustHtml(this.teamInfo.hdjh);
    this.sbys = this.domSantizer.bypassSecurityTrustHtml(this.teamInfo.sbys);
  }

}

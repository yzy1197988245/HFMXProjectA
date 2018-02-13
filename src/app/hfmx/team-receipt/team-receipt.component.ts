import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {ActivatedRoute} from "@angular/router";
import "rxjs/add/operator/switchMap"

@Component({
  selector: 'app-team-receipt',
  templateUrl: './team-receipt.component.html',
  styleUrls: ['./team-receipt.component.scss']
})
export class TeamReceiptComponent implements OnInit {

  url;
  teamId;
  teamInfo;
  members;
  isChooseFile;
  receiptFile = [];
  otherFiles = [];
  fileSelectorTag = 0;
  selectedFiles = [];

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe(params => {
      this.teamId = params.get('id');
    })
  }

  ngOnInit() {
    this.url = HttpService.base_url + 'api/upload-file';
    this.httpService.studentGetTeamBaseInfo(this.teamId)
      .subscribe(response => {
        this.teamInfo = response.teamInfo;
        this.members = response.members;
      })
  }

  chooseReceipt(): void {
    this.selectedFiles = this.receiptFile;
    this.fileSelectorTag = 0;
    this.isChooseFile = true;
  }

  chooseOtherFiles(): void {
    this.selectedFiles = this.otherFiles;
    this.fileSelectorTag = 1;
    this.isChooseFile = true;
  }

  fileSelected(event): void {
    this.isChooseFile = false;
    if (this.fileSelectorTag == 0) {
      this.receiptFile = event;
    } else {
      this.otherFiles = event;
    }
  }

}



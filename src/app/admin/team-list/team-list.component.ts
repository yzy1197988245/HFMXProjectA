import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
})
export class TeamListComponent implements OnInit {

  teamList;
  currentTeam;
  showDetail = false;
  nfOptions = [];
  xyOptions = ['资源', '地测', '化环', '机电', '管理', '力建', '理', '文法'];
  sfOptions = [];
  pageSizeOptions = [10, 15, 20, 25, 50, 100];
  totalCount = 0;

  queryParams: FormGroup;
  currentPage = 1;
  pageSize = 15;

  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder
  ) {
    this.queryParams = formBuilder.group({
      nf: [''],
      xy: [''],
      sf: [''],
      dz: [''],
      xh: [''],
      page: [1],
      pageSize: [15]
    })
  }

  ngOnInit() {
    this.getList();
  }

  getList(): void {
    let params = this.queryParams.value;
    this.httpService.sfOptions()
      .then(res => {
        this.sfOptions = res.data;
      });
    this.httpService.nfOptions().then(res => this.nfOptions = res);
    this.httpService.xyOptions().then(res => this.xyOptions = res);
    this.httpService.adminGetTeamList(params)
      .then(response => {
        this.totalCount = response.total;
        this.teamList = response.data;
        this.currentPage = response.current_page;
        this.pageSize = response.per_page;
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

  pageChanged(event): void {
    this.queryParams.controls['page'].setValue(event.page);
    this.queryParams.controls['pageSize'].setValue(event.itemsPerPage);
    this.getList();
  }
}

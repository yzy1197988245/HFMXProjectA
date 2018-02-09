import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-statistics-data',
  templateUrl: './statistics-data.component.html',
  styleUrls: ['./statistics-data.component.scss']
})
export class StatisticsDataComponent implements OnInit {

  studentCount;
  teamCount;
  xyDataset = [];
  sfDataset = [];
  data;
  loading = true;

  constructor(
    private httpService: HttpService
  ) {

  }

  ngOnInit() {
    this.httpService.adminGetStatisticData()
      .then(res => {
        this.studentCount = res.studentCount;
        this.teamCount = res.teamCount;
        this.xyDataset = res.xyDataSet;
        console.log(this.xyDataset);
        this.sfDataset = res.sfDataSet;
        this.loading = false;
      });
  }
}

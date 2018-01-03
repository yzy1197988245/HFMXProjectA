import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class HttpService {

  static base_url = 'http://localhost/';

  constructor(
    private http: HttpClient
  ) { }

  login(params): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/login', params)
      .toPromise();
  }

  zxOptions(searchText): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/select-option/byzx', {'searchText': searchText})
      .toPromise();
  }

  xsOptions(searchText): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/select-option/xsxx', {'searchText': searchText})
      .toPromise();
  }

  sfOptions(): Promise<any> {
    return this.http.get(HttpService.base_url + 'api/select-option/sysf')
      .toPromise();
  }

  checkMember(memberXh): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/hfmx/check-member', {'xh': memberXh})
      .toPromise();
  }

  createTeam(params): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/hfmx/create-team', params)
      .toPromise();
  }

  getTeamDetail(teamId): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/hfmx/team-detail', {'teamId': teamId})
      .toPromise();
  }

  updateTeam(params): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/hfmx/update-team', params)
      .toPromise();
  }

  deleteTeam(teamId): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/hfmx/delete-team', {'teamId': teamId})
      .toPromise();
  }

  adminGetTeamList(params): Promise<any> {
    console.log(params);
    return this.http.post(HttpService.base_url + 'api/team/admin-team-list', params)
      .toPromise();
  }

  adminGetTeamInfo(teamId): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/team/admin-team-info', {'teamId': teamId})
      .toPromise();
  }

  studentGetTeamList(xh): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/team/student-team-list', {'xh': xh})
      .toPromise();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Router} from "@angular/router";
import {MessageService} from "./message.service";

@Injectable()
export class HttpService {

  static base_url = 'http://localhost/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {

  }

  handleError(reason): any {
    if (reason.status == 401) {
      this.messageService.showWarning('没有权限!');
      //this.router.navigate(['/', 'login']);
    }
    return Promise.reject(reason);
  }

  login(params): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/login', params)
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  getUserInfo(): Promise<any> {
    return this.http.get(HttpService.base_url + 'api/user-info')
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  zxOptions(searchText): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/select-option/byzx', {'searchText': searchText})
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  xsOptions(searchText): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/select-option/xsxx', {'searchText': searchText})
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  sfOptions(): Promise<any> {
    return this.http.get(HttpService.base_url + 'api/select-option/sysf')
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  nfOptions(): Promise<any> {
    return this.http.get(HttpService.base_url + 'api/select-option/nf')
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  xyOptions(): Promise<any> {
    return this.http.get(HttpService.base_url + 'api/select-option/xy')
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  checkMember(memberXh): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/hfmx/check-member', {'xh': memberXh})
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  createTeam(params): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/hfmx/create-team', params)
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  getTeamDetail(teamId): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/hfmx/team-detail', {'teamId': teamId})
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  updateTeam(params): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/hfmx/update-team', params)
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  deleteTeam(teamId): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/hfmx/delete-team', {'teamId': teamId})
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  adminGetTeamList(params): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/team/admin-team-list', params)
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  adminGetTeamInfo(teamId): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/team/admin-team-info', {'teamId': teamId})
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  studentGetTeamList(xh): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/team/student-team-list', {'xh': xh})
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  adminSyncStudentInfo(): Promise<any> {
    return this.http.get(HttpService.base_url + 'api/student/admin-sync-student-info')
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  adminGetStudentList(): Promise<any> {
    return this.http.get(HttpService.base_url + 'api/student/admin-get-student-list')
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }
}

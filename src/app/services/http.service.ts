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
  ) { }

  handleError(reason): any {
    if (reason.status == 401) {
      this.messageService.showWarning('没有权限!');
      this.router.navigate(['/', 'login']);
    } else {
      return Promise.reject(reason);
    }
  }

  login(params): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/login', params)
      .toPromise()
      .catch(this.handleError)
  }

  zxOptions(searchText): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/select-option/byzx', {'searchText': searchText})
      .toPromise()
      .catch(this.handleError);
  }

  xsOptions(searchText): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/select-option/xsxx', {'searchText': searchText})
      .toPromise()
      .catch(this.handleError);
  }

  sfOptions(): Promise<any> {
    return this.http.get(HttpService.base_url + 'api/select-option/sysf')
      .toPromise()
      .catch(this.handleError);
  }

  checkMember(memberXh): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/hfmx/check-member', {'xh': memberXh})
      .toPromise()
      .catch(this.handleError);
  }

  createTeam(params): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/hfmx/create-team', params)
      .toPromise()
      .catch(this.handleError);
  }

  getTeamDetail(teamId): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/hfmx/team-detail', {'teamId': teamId})
      .toPromise()
      .catch(this.handleError);
  }

  updateTeam(params): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/hfmx/update-team', params)
      .toPromise()
      .catch(this.handleError);
  }

  deleteTeam(teamId): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/hfmx/delete-team', {'teamId': teamId})
      .toPromise()
      .catch(this.handleError);
  }

  adminGetTeamList(params): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/team/admin-team-list', params)
      .toPromise()
      .catch(this.handleError);
  }

  adminGetTeamInfo(teamId): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/team/admin-team-info', {'teamId': teamId})
      .toPromise()
      .catch(this.handleError);
  }

  studentGetTeamList(xh): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/team/student-team-list', {'xh': xh})
      .toPromise()
      .catch(this.handleError);
  }

  adminSyncStudentInfo(): Promise<any> {
    console.log('666');
    return this.http.get(HttpService.base_url + 'api/student/admin-sync-student-info')
      .toPromise()
      .catch(this.handleError);
  }
}

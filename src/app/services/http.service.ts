import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {MessageService} from "./message.service";
import {AuthService} from "./auth.service";

@Injectable()
export class HttpService {

  static base_url = 'http://localhost/';
  public requestHeaders;
  public requestOptions;

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService,
    private auth: AuthService
  ) {
    this.updateRequestOptions();
  }

  updateRequestOptions(): void {
    this.requestHeaders = new HttpHeaders();
    if (this.auth.isLoggedIn) {
      this.requestHeaders = this.requestHeaders.set('Authorization', this.auth.getAuthorizationHeader()).set('guard', this.auth.guard);
    }
    this.requestOptions = {headers: this.requestHeaders};
  }

  handleError(reason): any {
    if (reason.status == 401) {
      this.messageService.showWarning('没有权限!');
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
    return this.http.get(HttpService.base_url + 'api/user-info', this.requestOptions)
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  getAppConfig(): Promise<any> {
    return this.http.get(HttpService.base_url + 'api/get-app-config', this.requestOptions)
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  updateAppConfig(configs): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/update-app-config', configs, this.requestOptions)
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  uploadExchangeCodeImage(image): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/update-exchange-code-image', image, this.requestOptions)
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  zxOptions(searchText): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/select-option/byzx', {'searchText': searchText}, this.requestOptions)
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  xsOptions(searchText): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/select-option/xsxx', {'searchText': searchText}, this.requestOptions)
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  sfOptions(): Promise<any> {
    return this.http.get(HttpService.base_url + 'api/select-option/sysf', this.requestOptions)
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  nfOptions(): Promise<any> {
    return this.http.get(HttpService.base_url + 'api/select-option/nf', this.requestOptions)
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  xyOptions(): Promise<any> {
    return this.http.get(HttpService.base_url + 'api/select-option/xy', this.requestOptions)
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  checkMember(memberXh): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/hfmx/check-member', {'xh': memberXh}, this.requestOptions)
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  createTeam(params): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/hfmx/create-team', params, this.requestOptions)
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  getTeamDetail(teamId): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/hfmx/team-detail', {'teamId': teamId}, this.requestOptions)
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  updateTeam(params): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/hfmx/update-team', params, this.requestOptions)
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  deleteTeam(teamId): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/hfmx/delete-team', {'teamId': teamId}, this.requestOptions)
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  adminGetTeamList(params): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/team/admin-team-list', params, this.requestOptions)
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  adminGetTeamInfo(teamId): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/team/admin-team-info', {'teamId': teamId}, this.requestOptions)
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  studentGetTeamList(xh): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/team/student-team-list', {'xh': xh}, this.requestOptions)
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  adminSyncStudentInfo(): Promise<any> {
    return this.http.get(HttpService.base_url + 'api/student/admin-sync-student-info', this.requestOptions)
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  adminGetStudentList(params): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/student/admin-get-student-list', params, this.requestOptions)
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  adminGetStatisticData(): Promise<any> {
    return this.http.get(HttpService.base_url + 'api/statistic/get-data', this.requestOptions)
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }
}


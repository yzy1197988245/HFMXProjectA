import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from "@angular/common/http";
import {Router} from "@angular/router";
import {MessageService} from "./message.service";
import {Observable} from "rxjs/Observable";

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
    } else if (reason.status == 429) {
      this.messageService.showWarning('网络繁忙，请稍后再试！');
    }
    console.log(reason);
    return Promise.reject(reason);
  }

  handleError2(error): any {
    console.log('error');
    return error;
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

  getAppConfig(): Promise<any> {
    return this.http.get(HttpService.base_url + 'api/get-app-config')
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  updateAppConfig(configs): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/update-app-config', configs)
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  uploadExchangeCodeImage(image): Observable<any> {
    const request = new HttpRequest('POST', HttpService.base_url + 'api/update-exchange-code-image', image, {
      reportProgress: true
    });
    return this.http.request(request).catch(error => {
      throw this.handleError2(error);
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

  adminGetStudentList(params): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/student/admin-get-student-list', params)
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  adminGetStudentInfo(id): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/student/admin-get-student-info', {'id': id})
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  adminCreateOrUpdateStudent(student): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/student/admin-create-or-update-student', student)
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  adminDeleteStudent(id): Promise<any> {
    return this.http.post(HttpService.base_url + 'api/student/admin-delete-student', {'id': id})
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  adminGetStatisticData(): Promise<any> {
    return this.http.get(HttpService.base_url + 'api/statistic/get-data')
      .toPromise()
      .catch((error) => {
        return this.handleError(error);
      });
  }

  studentGetTeamBaseInfo(id): Observable<any> {
    return this.http.post(HttpService.base_url + 'api/team/student-get-team-base-info', {'id': id})
      .catch(err => {
        throw this.handleError2(err);
      })
  }

  getFileList(): Observable<any> {
    return this.http.get(HttpService.base_url + 'api/get-file-list')
      .catch(err => {
        throw this.handleError2(err);
      })
  }

  deleteFile(id): Observable<any> {
    return this.http.post(HttpService.base_url + 'api/delete-file', {'id': id})
      .catch(err => {
        throw this.handleError2(err);
      })
  }

  studentCreateOrUpdateReceipt(receipt): Observable<any> {
    return this.http.post(HttpService.base_url + 'api/team/student-create-or-update-receipt', receipt)
      .catch(err => {
        throw this.handleError2(err);
      })
  }

  studentGetTeamReceipt(teamId): Observable<any> {
    return this.http.post(HttpService.base_url + 'api/team/student-get-receipt', {'id':teamId})
      .catch(err => {
        throw this.handleError2(err);
      })
  }
}


import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UEditorComponent} from "ngx-ueditor";

@Injectable()
export class HttpService {

  static base_url = 'http://219.242.68.33:81/';

  constructor(
    private http: HttpClient
  ) { }

  getUeditorContent(editor: UEditorComponent): string {
    const htmlText = editor.Instance.getAllHtml() as string;
    const index1 = htmlText.indexOf('<body >');
    const index2 = htmlText.indexOf('</body>');
    let string = htmlText.substr(index1 + 7, index2);
    string = string.replace(/;background-color: white/g, '');
    return string;
  }

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
}


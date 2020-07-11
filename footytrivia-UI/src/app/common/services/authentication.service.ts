import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url: string;

  constructor(private http: HttpClient) { }

  //#region Auth Endpoints
  Login(data: any) {
    return this.http.post(this.getUrl('login'),
      { email_id: data.email, password: data.password, provider: data.provider }
      , { headers: reqHeader });
  }

  Register(data: any) {
    return this.http.post(this.getUrl('register'), data, { headers: reqHeader });
  }
  //#endregion

  //#region Common Method To get and combine URL
  private getUrl(url: string): string {
    const u = environment.apiUrl + url;
    return u;
  }
  //#endregion
}

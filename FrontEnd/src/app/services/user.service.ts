import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "./auth.service";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { IUser } from "../settings/models/user.interface";
import { BehaviorSubject, map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {

  constructor(
    private router: Router,
    private api: ApiService,
    private auth: AuthService,
    private translate: TranslateService,
    private toastrService: ToastrService,
  ) {}

  public getUsers(): Observable<any> {

    return this.api.getTypeRequest('users').pipe(
      map((res: any) => {

        const users: BehaviorSubject<IUser[]> = res;

        return users;
      })
    );
  }

  public userRegister(body: any) {

    this.api.postTypeRequest('users', body).subscribe((res: any) => {
      if (res.status == 200) {

        this.toastrService.success(this.translate.instant('COMPONENT.TOAST.REGISTER_SUCCESSFULLY'));
        this.router.navigate(['login']);
      } else {

        this.toastrService.error(this.translate.instant('COMPONENT.TOAST.REGISTER_INCORRECT'));
      }
    })
  }
  public userLogin(body: any) {

    this.api.postTypeRequest('login', body).subscribe((res: any) => {

      if (res.status == 200) {
        const username = res.data.name

        this.auth.setDataInLocalStorage('userData', username);
        this.auth.setDataInLocalStorage('token', res.token);
        this.auth.setDataInLocalStorage('rememberMe', body.rememberMe)

        this.router.navigate(['']);
      } else {

        this.toastrService.error(this.translate.instant('COMPONENT.TOAST.LOGIN_INCORRECT'));
      }
    })
  }

  public autoLogin(){
    const accessTokenObj = this.auth.getToken();
    const rememberMe = this.auth.getRememberMe();

    if (accessTokenObj && rememberMe == 'yes') {
      this.router.navigate(['dashboard']);
    }
  }

  public guestLogin(){
    this.auth.setDataInLocalStorage('token', "GUEST");
    this.router.navigate(['']);
  }

  public getUser(username: string): Observable<any> {
    return this.api.getTypeRequest('users/' + username);
  }

  public updateUser(username: string, body: any) {

    this.api.putTypeRequest('users/' + username, body).subscribe((res: any) => {

      if (res.status == 200) {

        this.toastrService.success(this.translate.instant('COMPONENT.TOAST.USER_UPDATED'));
        this.router.navigate(['profile']);
      } else {

        this.toastrService.error(this.translate.instant('COMPONENT.TOAST.USER_NOT_UPDATED'));
      }
    })
  }

  public deleteUser(username: string) {

    this.api.deleteTypeRequest('users/' + username).subscribe((res: any) => {

      if (res.status == 200) {

        this.toastrService.success(this.translate.instant('COMPONENT.TOAST.USER_DELETED'));
        this.router.navigate(['login']);
      } else {

        this.toastrService.error(this.translate.instant('COMPONENT.TOAST.USER_NOT_DELETED'));
      }
    })
  }

}

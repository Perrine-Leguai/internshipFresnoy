import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private router : Router,
    private route : ActivatedRoute
    ) { }

  public login(username : string, pwd :string){
    return  this.http.post("http://localhost:8000/v2/rest-auth/login/", {
      'username' : username,
      'password' : pwd,
    })
  }

  public getUserInfo(username : any){
    return this.http.get('http://127.0.0.1:8000/v2/people/user/'+ username)
  }

  public logout(){
    this.http.post("http://localhost:8000/v2/rest-auth/logout/", {
    })
    localStorage.clear();
    this.router.navigate(['/home'], {relativeTo: this.route});

  }


}

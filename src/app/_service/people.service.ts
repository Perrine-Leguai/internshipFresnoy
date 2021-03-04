import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//model
import { User } from '../_model/user.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) { }

  //get all username
  getAllUsernames(){
    let getUsernames = this.http.get<User>("http://127.0.0.1:8000/v2/people/user", {
      observe : 'body',
    })

    return getUsernames;
  }

  //get user information by id
  getUserById(id : number){
    let getInfoUser = this.http.get<User>("http://127.0.0.1:8000/v2/people/user/"+id, {
      observe: 'body',
    })

    return getInfoUser;
  }

  //get artists
  getUserBySearch(keyup : string){
    let getArtist = this.http.get<User>("http://127.0.0.1:8000/v2/people/user/search?q="+ keyup, {
      observe: 'body',
    });

    return getArtist;
  }


}

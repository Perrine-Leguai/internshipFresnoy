import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//model
import { User } from '../_model/user.model';
import { configVar } from './configVar';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(
    private http: HttpClient,
    private configVar : configVar,
      ) { }

  //get all username
  getAllUsernames(){
    let getUsernames = this.http.get<User>(this.configVar.urlV2PeopleUser ,{
      observe : 'body',
    })

    return getUsernames;
  }

  //get user information by id
  getUserById(id : number){
    let getInfoUser = this.http.get<User>(this.configVar.urlV2PeopleUser+"/"+id, {
      observe: 'body',
    })

    return getInfoUser;
  }

  //get artists
  getUserBySearch(keyup : string){
    let getArtist = this.http.get<User>(this.configVar.urlV2PeopleUser+"/search?q="+ keyup, {
      observe: 'body',
    });

    return getArtist;
  }


}

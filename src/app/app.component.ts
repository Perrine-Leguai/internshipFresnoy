import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from './_model/user.model';
import { PeopleService } from './_service/people.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //observables
  usernames;

  sessionStorage= sessionStorage



  constructor(
    private http : HttpClient,
    private people : PeopleService
    ){

    }

  title = 'interfaceTeasers';


}

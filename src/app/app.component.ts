
import { Component } from '@angular/core';
import { AuthenticationService } from './_service/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  isConnected: boolean = false;


  constructor(
    private auth : AuthenticationService
    ){}

  ngOnInit(){
    if(sessionStorage.getItem('jwt')){

      this.isConnected = true;
    }
  }

  logout(){
    this.auth.logout();
    sessionStorage.clear();
    this.isConnected = false;
  }






}

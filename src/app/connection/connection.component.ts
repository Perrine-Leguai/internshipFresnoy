import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from '../_service/authentication.service';
import { PeopleService } from '../_service/people.service';


@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  //display variables
  isAlert: boolean = false;
  isUsernameOk: boolean ;
  isEmailOk: boolean;

  //cache stockage variables
  userList

  //connexion var
  id : number;

  constructor(
    private people : PeopleService,
    private spinner : NgxSpinnerService,
    private authentication : AuthenticationService,
    private router : Router
    ) { }

  ngOnInit(): void {
    (this.people.getAllUsernames()).subscribe((response)=>{
      this.userList = response;
      console.log(this.userList)
    });
  }

  // test if username exist or not
  testPseudo(event : Event){
    for(var user of this.userList){
      if((<HTMLInputElement>event.target).value == user.username){
        this.isUsernameOk=true;
        this.id = user.id;
        console.log(this.id)
        break;
      }else{
        this.isUsernameOk= false;
      }
    }
  }


  //test the pwd and catch the token to log
  onSubmit(form : NgForm){
    this.spinner.show();

    const username = form.value['username'];
    const password = form.value['password'];


    this.authentication.login(username, password).subscribe(data => {
      sessionStorage.setItem('jwt', JSON.stringify(data));


      this.authentication.getUserInfo(this.id).subscribe((userInfo) => {
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));

      })


      this.router.navigateByUrl('/home');
    }, error => {
      this.spinner.hide();
      return this.isAlert = true
    });

  }
}

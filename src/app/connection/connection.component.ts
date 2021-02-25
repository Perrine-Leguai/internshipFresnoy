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

  constructor(
    private people : PeopleService,
    private spinner : NgxSpinnerService,
    private authentication : AuthenticationService,
    private router : Router
    ) { }

  ngOnInit(): void {
    (this.people.getAllUsernames()).subscribe((response)=>{
      this.userList = response;
    });
  }

  // allow to test if username exist or not
  testPseudo(event : Event){

    for(var user of this.userList){

      if((<HTMLInputElement>event.target).value == user.username){
        this.isUsernameOk=true;
        break;
      }else{
        this.isUsernameOk= false;
      }
    }
  }

  //test if mail is into the database
  // testMail(event: Event){
  //   for(var user of this.userList){


  //     //faire recherche directos avec le id -> que la personne concernée -> donc le mail --> si pb = le mail ne correspond pas à l'identifiant
  //     if((<HTMLInputElement>event.target).value == user.email){

  //       this.isEmailOk=true;

  //       break;
  //     }else{
  //       this.isEmailOk= false;
  //     }
  //   }
  // }

  //test the pwd and catch the token to log
  onSubmit(form : NgForm){
    this.spinner.show();

    const username = form.value['username'];
    const password = form.value['password'];
    const email = form.value['email'];

    this.authentication.login(username, password, email).subscribe(data => {
      sessionStorage.setItem('jwt', JSON.stringify(data));
      console.log('log de jwt de sessionstorage de la fonction login ' + sessionStorage.getItem('jwt'));

      this.authentication.getUserInfo(sessionStorage?.getItem('id')).subscribe((userInfo) => {
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        console.log(sessionStorage);
      })
        console.log(sessionStorage + "apres");

      this.router.navigateByUrl('/');
    }, error => {
      this.spinner.hide();
      return this.isAlert = true
    });

  }
}

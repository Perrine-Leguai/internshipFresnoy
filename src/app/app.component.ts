import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ResearchComponent} from './research/research.component'
import { PeopleService } from './_service/people.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(ResearchComponent) child;
  message;

  constructor(
    private http : HttpClient,
    private people : PeopleService
    ){}

    ngAfterViewInit(){
      this.message = this.child.message
    }

  receivedMessageFromChild($event ){
    console.log($event);
    this.message = $event;
  }



}

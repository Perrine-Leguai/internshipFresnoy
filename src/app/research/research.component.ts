import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';

//imported compenent via npm for design
import { faSearch } from '@fortawesome/free-solid-svg-icons';


//model
import { Artwork } from '../_model/artwork.model';


//services
import { ProductionService } from '../_service/production.service';
import { PeopleService } from '../_service/people.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {
  //icones
  faSearch= faSearch

  //data storage variables
  listFilms : any;
  formerTitle: string ;
  artwork : Artwork ;
  selected : string;


  //VARIABLE A DETRUIRE
  film: any;

  constructor(
    private production : ProductionService,
    private people : PeopleService,
    private spinnerService : NgxSpinnerService
    ) { }

  ngOnInit(): void {}


  catchMediaInfo(){

    (this.production.getArtworkInfos(this.selected)).subscribe((response) =>{
        this.listFilms = response["objects"];
      console.log(this.listFilms);
    })

   }



}

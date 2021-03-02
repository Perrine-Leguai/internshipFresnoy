import { Component, OnInit, Output, EventEmitter } from '@angular/core';


//imported compenent via npm for design
import { faSearch } from '@fortawesome/free-solid-svg-icons';


//model
import { Artwork } from '../_model/artwork.model';


//services
import { ProductionService } from '../_service/production.service';
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
  picture: string ;

  //Sharing data with the parent component
  message: string;
  @Output() messageEvent = new EventEmitter<string>()

  constructor(
    private production : ProductionService,
    ) { }

  ngOnInit(): void {}

  catchMediaInfo(){
    //stock var to display component in the parent
    sessionStorage.setItem('displayInfos', 'isDisplayedInfos');
    this.message= sessionStorage.getItem('displayInfo');

    //get the filmList with what have been typed
    (this.production.getArtworkInfos(this.selected)).subscribe((response) =>{
        this.listFilms = response["objects"];
        console.log(this.listFilms);
        //picture src processing
      for(var film of this.listFilms){
        let regex = (/\w+\.[a-z]{3}/i);
        this.picture = this.catchPictureFormat(film.picture);
     }

    })

   }

   //to keep the file name and format
   catchPictureFormat(string : string){
     return string.split('\/\/\/\/\/').pop().split('/').pop();
   }



}

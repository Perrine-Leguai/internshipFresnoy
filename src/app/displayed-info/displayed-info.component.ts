import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductionService } from '../_service/production.service';

@Component({
  selector: 'app-displayed-info',
  templateUrl: './displayed-info.component.html',
  styleUrls: ['./displayed-info.component.css']
})
export class DisplayedInfoComponent implements OnInit {
  //display variables
  vimeoLinks= ['VF', 'VEN', 'VODVF', 'VODVEN'];

  //boolean - display div
  isTitleFilmModified: boolean;

  //stock Variables
  id : number;
  type: string;
  artwork : any;


  constructor(
    private route: ActivatedRoute,
    private production : ProductionService,
    private router: Router,
  ) {

   }



  ngOnInit(): void {
    //security for unlogged people
    // if(!sessionStorage){
    //   this.router.navigateByUrl('/', {skipLocationChange: true});
    // }

    //catch id from url
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    (this.production.getOneArtworkInfo(this.id)).subscribe((response) => {
     this.artwork = response;
    })
  }


  capitalizeFirstLetter(word: string){
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

  addNewTitle(event){
    //catch type from url + first letter majuscule to fit with patch request
    this.type = this.capitalizeFirstLetter(this.route.snapshot.paramMap.get('type'));


    let formerTitle = this.artwork.title


    this.isTitleFilmModified = true;
    if(Number(<KeyboardEvent>event.keyCode) == 13){
      let filmTitle = (<HTMLInputElement>event.target).value;

      //patch formerTitle
      this.production.patchArtworkInfo(this.id, "former_title", formerTitle, this.type).subscribe((response) =>{
        console.log(response);
      });

      //patch new title
      this.production.patchArtworkInfo(this.id, "title", filmTitle, this.type).subscribe((response) =>{
        console.log(response);
      });

    };

  }
}

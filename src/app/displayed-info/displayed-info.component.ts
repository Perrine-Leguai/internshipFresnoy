import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationStart, ParamMap, Router, RouterEvent } from '@angular/router';
import { ProductionService } from '../_service/production.service';
import {filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { AssetsService } from '../_service/assets.service';


@Component({
  selector: 'app-displayed-info',
  templateUrl: './displayed-info.component.html',
  styleUrls: ['./displayed-info.component.css']
})
export class DisplayedInfoComponent implements OnInit {
  //icons
  faIcon = faPen;

  //display variables
  vimeoLinks= ['VF', 'VEN', 'VODVF', 'VODVEN'];

  //boolean - display div
  isTitleFilmModified: boolean;
  isDisabled: boolean =true;
  isAllow: boolean =false;  //only for superuser and staff
  isContentOwner: boolean = false;  //only for the content owner. Will allow to modify some inputs

  //stock Variables
  id : number;
  type: string;
  artwork : any;
  names: string;

  //TEST
  private destroyed$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private production : ProductionService,
    private router: Router,
    private assets: AssetsService,
  ) {

   }



  ngOnInit(): void {

    //security for updating - staff and superuser
    let uISS = JSON.parse(sessionStorage.getItem('userInfo'));
    var profil =  uISS.profile;
    if(uISS.is_superuser || profil.is_staff ){
      this.isAllow = true;
    }


    //old way, more complicated but to keep in mind :)
    // this.router.events.pipe(
    //   filter((event: RouterEvent) => event instanceof NavigationStart),
    //   takeUntil(this.destroyed$),
    // ) .subscribe((event: NavigationStart) =>{
    //   this.router.routerState.snapshot.url = event.url

    //   this.route.params.subscribe((response) => {
    //     console.log(response);
    //     this.id = response.id;
    //     this.type = response.type;
    //     (this.production.getOneArtworkInfo(this.id)).subscribe((response) => {
    //     this.artwork = response;
    //     })
    //   })

    // })

    if(this.id!=null){
      this.id=null;
    }else{
      this.route.paramMap.subscribe((params: ParamMap) => {
        //catch id from url
        this.id = Number(params.get('id'));
        // find the matching artwork
        (this.production.getOneArtworkInfo(this.id)).subscribe((response) => {
          this.artwork = response;
          //create var to use in html
          this.names = this.artwork.authors[0].user.first_name +" "+ this.artwork.authors[0].user.last_name;

          //check if the logged artist is the content owner
          this.idArtistCheck(this.artwork.authors, profil.id);
        })

        //catch type from url + first letter majuscule to fit with patch request
        this.type = this.capitalizeFirstLetter(params.get('type'));
      })
    }
  }

  capitalizeFirstLetter(word: string){
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

  idArtistCheck(authors : any, idLogged: number){
    for( let author of authors){
      console.log(author.id)
      if(author.id == idLogged){
        this.isContentOwner = true;
      }
    }

  }


  addNewTitle(event){
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

  onSubmit(form, event: Event){
    let link = (<HTMLInputElement>event.target[0]).value;
    let inputId = (<HTMLInputElement>event.target).id;

    let position = 444;
    let label = "teaser " + inputId;
    let descriptionMedium = "tesear"+inputId;
    let medium_url = link;


    //create gallery
    let description = "teasers  "
    this.assets.postNewGallery("teaser", description).subscribe((data)=> {
      var urlGallery = data['url'] //catch gallery url to reuse in create medium

      //create Medium
      this.createMedium(position, label, descriptionMedium, null, medium_url, null, urlGallery);

      //update Artwork with the new gallery
      if(this.artwork.teaser_galleries !=null){    //add a new gallery without deleting
        var coucou = this.artwork.teaser_galleries.push(urlGallery);

        this.updateArtwork(this.id, "teaser_galleries", this.artwork.teaser_galleries, this.type);
      }else{    //add a gallery
        this.updateArtwork(this.id, "teaser_galleries", urlGallery, this.type);
      }

    });



  }

  createMedium(position: number, label: string, descriptionMedium: string, picture: string, medium_url : string, file: string ,gallery: string){
    this.assets.postNewMedium(position, label, descriptionMedium, picture, medium_url, file, gallery)
        .subscribe((response) => {
        })
  }

  updateArtwork(id: number, whichAttribute: string, url, type: string){
    var tabUrl= url;

    this.production.patchArtworkInfo(id, whichAttribute, tabUrl, type).subscribe((date)=>{});

  }
}

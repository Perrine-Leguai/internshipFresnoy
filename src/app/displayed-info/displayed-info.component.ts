import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationStart, ParamMap, Router, RouterEvent } from '@angular/router';
import { ProductionService } from '../_service/production.service';
import {filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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

  //TEST
  private destroyed$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private production : ProductionService,
    private router: Router,
  ) {

   }



  ngOnInit(): void {
    // //security for unlogged people
    // if(!sessionStorage){
    //   this.router.navigateByUrl('/login', {skipLocationChange: true});
    // }

    //old way, more complicated but to keep in mind :)
    // this.router.events.pipe(
    //   filter((event: RouterEvent) => event instanceof NavigationStart),
    //   takeUntil(this.destroyed$),
    // ) .subscribe((event: NavigationStart) =>{
    //   this.router.routerState.snapshot.url = event.url
    //   console.log(this.router.routerState.snapshot.url);
    //   this.route.params.subscribe((response) => {
    //     console.log(response);
    //     this.id = response.id;
    //     this.type = response.type;
    //     (this.production.getOneArtworkInfo(this.id)).subscribe((response) => {
    //     this.artwork = response;
    //     })
    //   })

    // })


    this.route.paramMap.subscribe((params: ParamMap) => {
      //catch id from url
      this.id = Number(params.get('id'));
      // find the matching artwork
      (this.production.getOneArtworkInfo(this.id)).subscribe((response) => {
        this.artwork = response;})
      //catch type from url + first letter majuscule to fit with patch request
      this.type = this.capitalizeFirstLetter(params.get('type'));
    })
  }


  capitalizeFirstLetter(word: string){
        return word.charAt(0).toUpperCase() + word.slice(1);
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
}

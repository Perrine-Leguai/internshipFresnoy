import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Artwork } from '../_model/artwork.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {
  api_v1_login = "pleguai";
  api_v1_password = "Fresnoy2021!!";  // __Fre$NOY__20XX__
  // url write
  url_api = "http://"+ this.api_v1_login +":"+ this.api_v1_password +"@127.0.0.1:8000";
  constructor(private http : HttpClient) { }


//////////  GET
  //get artworks infos
  getArtworkInfos(keyup : string){
    let getArtworkInfos = this.http.get<Artwork[]>("http://127.0.0.1:8000/v1/production/artwork/search?q="+ keyup,
                                                    {observe: 'body',}
                                                  )

    return getArtworkInfos
  }

  //get artwork info of a specific film
  getOneArtworkInfo(id: number){
    let getOneArtworkInfo = this.http.get<Artwork>("http://127.0.0.1:8000/v1/production/artwork/"+id,
                                                    {observe: 'body',}
                                                  )
    return getOneArtworkInfo;
  }

//////////  PATCH

  patchArtworkInfo( artwokId: number, wichArtworkProperty: string, newValue : string, type: string){
    console.log(wichArtworkProperty, newValue, type);
    let patchArtworkInfo = this.http.patch("http://localhost:8000/v2/production/artwork/"+ artwokId,
                                            {
                                              [wichArtworkProperty] : newValue,
                                             type:  type
                                            },
                                            { observe: 'response'}
                                          )
    return patchArtworkInfo;
  }



}

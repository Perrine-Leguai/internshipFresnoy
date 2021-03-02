import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor(
    private http: HttpClient
  ) { }


  //////////  POST

  //creat new gallery
  postNewGallery( label: string, description: string, ){

    let postGallery = this.http.post("http://localhost:8000/v2/assets/gallery",
                                      {
                                        label: label,
                                        description:  description
                                      },
                                      { observe: 'body'}
                                    );
    return postGallery;
  }

  //creat new medium
  postNewMedium (position: number, label: string, description: string, picture: string, medium: string, file: string, gallery: string ){
    let postMedium = this.http.post("http://localhost:8000/v2/assets/medium",
                                      {
                                        position : position,
                                        label: label,
                                        description: description,
                                        picture: picture,
                                        medium_url: medium,
                                        file: file,
                                        gallery: gallery
                                      },
                                      {observe: 'body'}
                                    );

    return postMedium;
  }
}

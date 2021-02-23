import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { Router } from '@angular/router';

import {Gallery} from './Gallery.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { title } from 'process';

@Injectable({
    providedIn: 'root'
  })

  export class GalleryService{
    private gallerys: Gallery[] = [];
    private   galleryUpdated = new Subject<Gallery[]>();

    constructor(private http: HttpClient, private router: Router) { }

    getGalleryUpdatedListner() {
        return this.galleryUpdated.asObservable();
      }

      getGallerys(){
        this.http.get<{ message: string, Gallery: any }>('http://localhost:3000/api/Gallery')
        .pipe(map((galleryData) => {
          console.log(galleryData);
          return galleryData.Gallery.map(gallery => {
            return {
              GalleryTitle: gallery.GalleryTitle,
              GalleryImage: gallery.GalleryImage,
              id: gallery._id,
              GalleryDescription :gallery.GalleryDescription
            };
          });
        }))
        .subscribe(TransformedcatData => {
          //console.log(TransformedcatData);
          this.gallerys = TransformedcatData;
          this.galleryUpdated.next([...this.gallerys]);
        });
      }
      getGallery(id: string) {
        return this.http.get<{ _id: string, GalleryTitle: string, GalleryImage: string ,GalleryDescription : string}>('http://localhost:3000/api/Gallery/' + id)
      }

      addGallery(title: string, image: File,description: string) {
        const galleryData = new FormData();
        galleryData.append("title", title);
        galleryData.append("image", image, title);
        galleryData.append("description", description);
        this.http.post<{ message: string, gallery: Gallery }>('http://localhost:3000/api/Gallery',
          galleryData)
          .subscribe((responseData) => {
            console.log(responseData);
            const Gallery: Gallery = { id: responseData.gallery.id, GalleryTitle: title, GalleryImage: responseData.gallery.GalleryImage, GalleryDescription: description };
            console.log(responseData.message);
            window.alert('The Gallery has been added!');
            this.gallerys.push(Gallery);
            this.galleryUpdated.next([...this.gallerys]);
            this.router.navigate(["/admin/gallerys"]);
          });
    
      }

      updateGallery(id: string, title: string, image: File | string,description: string) {
        let galleryData: Gallery | FormData;

        if(typeof(image) === 'object'){
          galleryData = new FormData();
          galleryData.append("id",id);
          galleryData.append("title",name);
          galleryData.append("image",image,name);
          galleryData.append("description",description);
        }
        else {
          galleryData ={
            id :id,
            GalleryTitle :title,
            GalleryDescription :description,
            GalleryImage : image
          }
        }
        this.http.put('http://localhost:3000/api/Gallery/' + id, galleryData)
        .subscribe(response =>{
          const updatedGallery= [...this.gallerys];
          const oldGallery = updatedGallery.findIndex(p=>p.id ===id);
          const Gallery:Gallery ={
            id :id,
            GalleryTitle :title,
            GalleryDescription :description,
            GalleryImage : "response.GalleryImage"
          }
          updatedGallery[oldGallery] =Gallery;
          this.gallerys = updatedGallery;
          this.galleryUpdated.next([...this.gallerys]);
          this.router.navigate(["/admin/gallerys"]);
        })

      }

      deleteGallery(id: string) {
        this.http.delete('http://localhost:3000/api/Gallery/' + id)
          .subscribe(() => {
            const updatedGallery = this.gallerys.filter(mem => mem.id != id);
            this.gallerys = updatedGallery;
            this.galleryUpdated.next([...this.gallerys]);
            //console.log('Deleted !');
          })
      }

  }
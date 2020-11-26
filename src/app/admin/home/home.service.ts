import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';
import { HomeMeta } from './homeMeta.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private meta: HomeMeta[] = [];
  private metaUpdated = new Subject<HomeMeta[]>();
  constructor(private http: HttpClient, private router: Router) { }

  getCategoryUpdatedListner() {
    return this.metaUpdated.asObservable();
  }

  addMeta(title: string, description: string, favicon: File, icon: File, welcomeText: string, welcomeDescrption: string) {
    const metaData = new FormData();
    metaData.append("title", title);
    metaData.append("description", description);
    metaData.append("image", favicon, title);
    metaData.append("image", icon, title);
    metaData.append("welcomeText", welcomeText);
    metaData.append("welcomeDescription", welcomeDescrption);
    this.http.post<{ message: string, meta: HomeMeta }>('http://localhost:3000/api/meta',
      metaData)
      .subscribe((responseData) => {
        console.log(responseData);
        const student: HomeMeta = { id: responseData.meta.id, WebsiteTitle: title, WebsiteDescription: description, imageFaviconPath: responseData.meta.imageFaviconPath, imageIconPath: responseData.meta.imageIconPath, websiteWelcomeText: responseData.meta.websiteWelcomeText, websiteWelcomeDescription: responseData.meta.websiteWelcomeDescription };
        console.log(responseData.message);
        window.alert('The student has been added!');
        this.meta.push(student);
        this.metaUpdated.next([...this.meta]);
        //this.router.navigate(["/students"]);
      });

  }

  // updateMeta(id: string, name: string, fathername: string, image: File | string,rollno:string,studentclass:string) {
  updateMeta(id: string, title: string, description: string, favicon: File | string, icon: File | string, welcomeText: string, welcomeDescrption: string) {
    console.log('updating category');
    let metaData: HomeMeta | FormData;
    if (typeof (favicon) === 'object' && typeof (icon) === 'object') {

      metaData = new FormData();
      metaData.append("id", id);
      metaData.append("title", title);
      metaData.append("description", description);
      metaData.append("image", favicon, title);
      metaData.append("image", icon, title);
      metaData.append("welcomeText", welcomeText);
      metaData.append("welcomeDescription", welcomeDescrption);
    }
    else if (typeof (favicon) === 'string' && typeof (icon) === 'string') {
      metaData = {
        id: id,
        WebsiteTitle: title,
        WebsiteDescription: description,
        imageFaviconPath: favicon,
        imageIconPath: icon,
        websiteWelcomeText: welcomeText,
        websiteWelcomeDescription: welcomeDescrption
      }
    }
    else if (typeof (favicon) === 'string' && typeof (icon) === 'object') {
      metaData = new FormData();
      metaData.append("id", id);
      metaData.append("title", title);
      metaData.append("description", description);
      metaData.append("image", favicon);
      metaData.append("image", icon, title);
      metaData.append("welcomeText", welcomeText);
      metaData.append("welcomeDescription", welcomeDescrption);
    }
    else {
      metaData = new FormData();
      metaData.append("id", id);
      metaData.append("title", title);
      metaData.append("description", description);
      metaData.append("image", favicon, title);
      metaData.append("image", icon);
      metaData.append("welcomeText", welcomeText);
      metaData.append("welcomeDescription", welcomeDescrption);
    }

    this.http.put('http://localhost:3000/api/meta/' + id, metaData)
      .subscribe(response => {
        console.log('updating object done');
        const updatedMeta = [...this.meta];
        const oldPost = updatedMeta.findIndex(p => p.id === id);
        const meta: HomeMeta = {
          id: id,
          WebsiteTitle: welcomeText,
          WebsiteDescription: welcomeDescrption,
          imageFaviconPath: "response.imageFaviconPath",
          imageIconPath: "response.imageIconPath",
          websiteWelcomeText: welcomeText,
          websiteWelcomeDescription: welcomeDescrption
        }
        updatedMeta[oldPost] = meta;
        this.meta = updatedMeta;
        this.metaUpdated.next([...this.meta]);
        //this.router.navigate(["/students"]);
      });
  }

  getMeta() {
    return this.http.get<{
      _id: string, title: string, description: string, imageFaviconPath: string, imageIconPath: string,
      welcomeTitle: string,
      welcomeDescription: string
    }>('http://localhost:3000/api/meta')
  }

}

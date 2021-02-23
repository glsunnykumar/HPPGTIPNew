import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {Gallery} from '../admin/gallery/gallery.model';
import { GalleryService } from '../admin/gallery/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

   Items;
   private gallerySubs: Subscription;

  constructor(private galleryService: GalleryService) { }

  ngOnInit(): void {

    this.galleryService.getGallerys();
    this.gallerySubs = this.galleryService.getGalleryUpdatedListner().subscribe((gallery:Gallery[])=>{
     // this.isLoading = false;
      this.Items = gallery;
      // this.dataSource = new MatTableDataSource<Gallery>(this.gallerys);
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    })

    // this.galleryService.getImage().subscribe((resp: any) => {
    //   this.Items = resp;
    //   console.log(resp);
    // });
  }

}

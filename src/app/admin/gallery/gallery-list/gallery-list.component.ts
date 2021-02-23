import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

import {Gallery} from '../gallery.model';
import { GalleryService } from '../gallery.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmBoxComponent, ConfirmDialogModel } from 'src/app/common/confirm-box/confirm-box.component';


@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.css']
})
export class GalleryListComponent implements OnInit {
  
  displayedColumns: string[] = ['srNo','imageUrl','Name','Description','action'];
  
  result: string = '';
 
  gallerys: Gallery[] = [];
   isLoading = false;
  dataSource =null;
  private gallerySubs: Subscription;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  constructor(public galleryService: GalleryService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.galleryService.getGallerys();
    this.gallerySubs = this.galleryService.getGalleryUpdatedListner().subscribe((gallery:Gallery[])=>{
      this.isLoading = false;
      this.gallerys = gallery;
      this.dataSource = new MatTableDataSource<Gallery>(this.gallerys);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  confirmDialog(catId: string ,catName:string): void {
    const message = 'Are you sure you want to delete Member?' +catName;
 
    const dialogData = new ConfirmDialogModel("Delete Member", message);
 
    const dialogRef = this.dialog.open(ConfirmBoxComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log(dialogResult)
      if(dialogResult){
         this.galleryService.deleteGallery(catId);
      }
    });
  }

  ngOnDestroy() {
    this.gallerySubs.unsubscribe();
  }

}

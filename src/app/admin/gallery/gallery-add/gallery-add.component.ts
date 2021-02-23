import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {Observable} from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {GalleryService} from '../gallery.service';
import {Gallery} from '../gallery.model';
import { mimeType } from '../../mime-type.validator';

@Component({
  selector: 'app-gallery-add',
  templateUrl: './gallery-add.component.html',
  styleUrls: ['./gallery-add.component.css']
})
export class GalleryAddComponent implements OnInit {
  isLoading = false;
  form:FormGroup;
  imagePreview: string ='../../../../assets/Images/defaultImage.png';
  mode = 'create';
  private galleryId: string;
  gallery :Gallery;

  constructor(public galleyService :GalleryService,public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
     
      'Name': new FormControl('', {
        validators: [Validators.required]
      }),
      'image' :new FormControl(null,{validators:[Validators.required],asyncValidators :[mimeType]}),
      'Description': new FormControl('', {
        validators: [Validators.required]
      })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.galleryId = paramMap.get('id');
        this.isLoading =true;
        this.galleyService.getGallery(this.galleryId).subscribe((resdata)=>{
          this.isLoading = false;
          this.gallery ={id:resdata._id,GalleryTitle:resdata.GalleryTitle,GalleryDescription:resdata.GalleryDescription , GalleryImage:resdata.GalleryImage};
          console.log(this.gallery);
          this.form.setValue({
            'Name' : this.gallery.GalleryTitle,
            'image' : this.gallery.GalleryImage,
            'Description' : this.gallery.GalleryDescription
          });
          this.imagePreview = this.gallery.GalleryImage;
          this.form.get('image').updateValueAndValidity();
        });
      };
    });

  }

  onImgePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  saveGallery(){
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.galleyService.addGallery(this.form.value.Name, this.form.value.image,this.form.value.Description);
    }
    else{
      this.galleyService.updateGallery(this.galleryId,this.form.value.Name, this.form.value.image,this.form.value.Description);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import {HomeService} from '../home.service';
import  {mimeType} from '../../mime-type.validator';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {HomeMeta} from '../homeMeta.model';

@Component({
  selector: 'app-home-meta',
  templateUrl: './home-meta.component.html',
  styleUrls: ['./home-meta.component.css']
})
export class HomeMetaComponent implements OnInit {

  form:FormGroup;
  imagePreview: string;
  imageBannerPreview:string;
  isLoading = false;
  mode = 'create';
  meta :HomeMeta;
  private metaSubs: Subscription;
  private metaId: string;

  constructor(public homeService :HomeService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
     
      'Title': new FormControl('', {
        validators: [Validators.required]
      }),
      'Description': new FormControl(null),
      'image' :new FormControl(null,{validators:[Validators.required],asyncValidators :[mimeType]}),
      'imageBanner' :new FormControl(null,{validators:[Validators.required],asyncValidators :[mimeType]}),
      'welcomeText': new FormControl('', {
        validators: [Validators.required]
      }),
      'welcomeDescription': new FormControl('', {
        validators: [Validators.required]
      })
    });
     //this.getMeta();

  }

  saveMeta(){
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      console.log(this.form.value.image);
      console.log(this.form.value.imageBanner);
      //this.homeService.addMeta(this.form.value.Title, this.form.value.Description, this.form.value.image,this.form.value.imageBanner,this.form.value.welcomeText,this.form.value.welcomeDescription);
    }
    else {
     this.homeService.updateMeta(this.metaId, this.form.value.Title, this.form.value.Description, this.form.value.image,this.form.value.imageBanner,this.form.value.welcomeText,this.form.value.welcomeDescription);
    }
    //this.form.reset();
  }

  getMeta(){
    this.isLoading = true;
    this.homeService.getMeta().subscribe(metaData =>{
      console.log(metaData);
      this.isLoading= false;
      this.mode= 'update';
      if(metaData._id === '') return;
      this.metaId = metaData._id;
      this.meta={id :metaData._id,WebsiteTitle:metaData.title,WebsiteDescription:metaData.description,imageFaviconPath:metaData.imageFaviconPath,imageIconPath:metaData.imageIconPath,websiteWelcomeText:metaData.welcomeTitle,websiteWelcomeDescription:metaData.
        welcomeDescription}
      this.form.setValue({
        'Title': this.meta.WebsiteTitle, 'Description': this.meta.WebsiteDescription,
        'image': this.meta.imageFaviconPath,
        'imageBanner': this.meta.imageIconPath,
        'welcomeText': this.meta.websiteWelcomeText,
        'welcomeDescription': this.meta.websiteWelcomeDescription
      });
      this.imagePreview = this.meta.imageFaviconPath;
      this.imageBannerPreview = this.meta.imageIconPath;
      this.form.get('image').updateValueAndValidity();
      this.form.get('imageBanner').updateValueAndValidity();
    },error =>{
      console.log(error);
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

  onBannerImgePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ imageBanner: file });
    this.form.get('imageBanner').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageBannerPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

}

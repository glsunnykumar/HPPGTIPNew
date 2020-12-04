import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from '../../mime-type.validator';
import { Notification } from '../notification.model';
import {NotificationService} from '../notification.service';

@Component({
  selector: 'app-notification-add',
  templateUrl: './notification-add.component.html',
  styleUrls: ['./notification-add.component.css']
})
export class NotificationAddComponent implements OnInit {

  isLoading = false;
  form:FormGroup;
  filePath:string;
  imagePreview: string ='../../../../assets/Images/pdf.jfif';
  mode = 'create';
  private notificationId: string;
  notification :Notification;
  file: File = null;

  constructor(private notificationService :NotificationService,public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
     
      'Title': new FormControl('', {
        validators: [Validators.required]
      }),
      // 'image' :new FormControl(null,{validators:[Validators.required],asyncValidators :[mimeType]}),
      'pdfFile' :new FormControl(null,{validators:[Validators.required],asyncValidators :[mimeType]}),
      'filePath': new FormControl(''
      ),
      'datePick': new FormControl('', {
        validators: [Validators.required]
      }),
      'Description': new FormControl('', {
        validators: [Validators.required]
      })
    });


    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.notificationId = paramMap.get('id');
        this.isLoading =true;
        this.notificationService.getnotification(this.notificationId).subscribe((resdata)=>{
          this.isLoading = false;
          this.notification ={id:resdata._id,title:resdata.title,description:resdata.description,date:resdata.date ,file:resdata.file};
          console.log(this.notification);
          this.form.setValue({
            'Title' : this.notification.title,
            'Description' : this.notification.description,
            'image' : this.notification.file,
            'date' : this.notification.date
          });
         // this.imagePreview = this.notification.file;
          //this.form.get('image').updateValueAndValidity();
        });
      };
    });
  }

  onImgePicked(event: Event) {
   
     this.file = (event.target as HTMLInputElement).files[0];
    //  this.form.patchValue({ pdfFile: file });
    //  this.form.get('pdfFile').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = this.file.name;
    };
    reader.readAsDataURL(this.file);
    this.form.get('filePath').updateValueAndValidity();
  }

  saveNotification(){
   
    if (this.form.invalid) {
      return;
    }
    console.log("adding notification");
    this.isLoading = true;
     if (this.mode === 'create') {
       this.notificationService.addNotification(this.form.value.Title, this.form.value.Description, this.file,this.form.value.datePick);
     }
    // else{
    //   this.notificationService.updatenotification(this.notificationId,this.form.value.Name, this.form.value.myControl, this.form.value.image,this.form.value.myControlDistrict);
    // }
  }

}

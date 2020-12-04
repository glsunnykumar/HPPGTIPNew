import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {Observable} from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { mimeType } from '../../mime-type.validator';
import { Member } from '../member.model';
import {MemberService} from '../member.service' ;


// import {} from '../../../../'

@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.css']
})
export class MemberAddComponent implements OnInit {
  isLoading = false;
  form:FormGroup;
  imagePreview: string ='../../../../assets/Images/defaultImage.png';
  mode = 'create';
  private memberId: string;
  member :Member;

  // myControl = new FormControl();
  myControlDistrict = new FormControl();
  options: string[] = ['State Representative', 'District Representative', 'Block Representative','Member'];
  optionDistrict :string[]=['Kangra','Shimla','Mandi','Bilaspur','Chamba'];
  filteredOptions: Observable<string[]>;
  filteredDistrictOptions:Observable<string[]>;

  constructor(public memberService :MemberService,public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
     
      'Name': new FormControl('', {
        validators: [Validators.required]
      }),
      'image' :new FormControl(null,{validators:[Validators.required],asyncValidators :[mimeType]}),
      'myControl': new FormControl('', {
        validators: [Validators.required]
      }),
      'myControlDistrict': new FormControl('', {
        validators: [Validators.required]
      })
    });

  
    this.filteredOptions = this.form.get("myControl").valueChanges
    .pipe(startWith(''),
    map(value => this._filter(value))
    );

    this.filteredDistrictOptions = this.myControlDistrict.valueChanges
    .pipe(startWith(''),
    map(value => this._filterDistrict(value))
    );

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.memberId = paramMap.get('id');
        this.isLoading =true;
        this.memberService.getMember(this.memberId).subscribe((resdata)=>{
          this.isLoading = false;
          this.member ={id:resdata._id,MemberName:resdata.MemberName,MemberDistrict:resdata.MemberDistrict,MemberRole:resdata.MemberRole , MemberImage:resdata.MemberImage};
          console.log(this.member);
          this.form.setValue({
            'Name' : this.member.MemberName,
            'myControl' : this.member.MemberRole,
            'image' : this.member.MemberImage,
            'myControlDistrict' : this.member.MemberDistrict
          });
          this.imagePreview = this.member.MemberImage;
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterDistrict(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionDistrict.filter(option => option.toLowerCase().includes(filterValue));
  }
  saveMember(){
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.memberService.addMember(this.form.value.Name, this.form.value.myControl, this.form.value.image,this.form.value.myControlDistrict);
    }
    else{
      this.memberService.updateMember(this.memberId,this.form.value.Name, this.form.value.myControl, this.form.value.image,this.form.value.myControlDistrict);
    }
  }

}

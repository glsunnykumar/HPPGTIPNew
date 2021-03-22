import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {Observable} from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { mimeType } from '../../mime-type.validator';
import { Member } from '../member.model';
import {MemberService} from '../member.service' ;
import * as XLSX from 'xlsx';


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
  isloadingExcel = false;
  private memberId: string;
  member :Member;
  name = 'This is XLSX TO JSON CONVERTER';
  willDownload = false;

  // myControl = new FormControl();
  myControlDistrict = new FormControl();
  options: string[] = ['State Representative', 'District Representative', 'Block Representative','Member'];
  optionDistrict :string[]=['Kangra','Shimla','Mandi','Bilaspur','Chamba'];
  filteredOptions: Observable<string[]>;
  filteredDistrictOptions:Observable<string[]>;
  jsonData = null;

  constructor(public memberService :MemberService,public route: ActivatedRoute) { }
  onFileChange(ev) {
    let workBook = null;
  
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
     this.jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});

      
      const dataString = JSON.stringify(this.jsonData);
      document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
      this.setDownload(dataString)
      ;
    }
    
    reader.readAsBinaryString(file);
  }


  setDownload(data) {
    this.willDownload = true;
    setTimeout(() => {
      const el = document.querySelector("#download");
      el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
      el.setAttribute("download", 'xlsxtojson.json');
    }, 1000)
  }


  ngOnInit(): void {
    this.form = new FormGroup({
     
      'Name': new FormControl('', {
        validators: [Validators.required]
      }),
      'SchoolName': new FormControl(''),
      'Amount': new FormControl('',{validators :[Validators.required]}),
      'image' :new FormControl(null,{validators:[Validators.required],asyncValidators :[mimeType]}),
      'myControl': new FormControl('', {
        validators: [Validators.required]
      }),
      'MembershipDate': new FormControl(''),
      'RenewalDate': new FormControl(''),
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
          // this is test
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

  saveMemberFromExcel(){
    this.memberService.addMemberExcel(this.jsonData);
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

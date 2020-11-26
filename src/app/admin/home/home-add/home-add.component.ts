import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home-add',
  templateUrl: './home-add.component.html',
  styleUrls: ['./home-add.component.css']
})
export class HomeAddComponent implements OnInit {
  form:FormGroup;
  isLoading = false;
  mode = 'create';
  constructor(public homeService :HomeService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
     
    });
  }

  saveHome(){
   
  }

}

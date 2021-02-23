import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  isLoading = false;
  form:FormGroup;
  constructor() { }

  ngOnInit(): void {

    this.form = new FormGroup({ 
      'Name': new FormControl('', [Validators.required]),
      'Email': new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      'Message': new FormControl('', [Validators.compose([Validators.required])])
     
      })

  }

  sendMessage(){
    
  }

}

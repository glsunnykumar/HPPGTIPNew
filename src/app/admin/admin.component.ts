import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';

@Component({
  selector: 'app-admin-root',
  templateUrl :'./admin.component.html'
})
export class AdminComponent implements OnInit,AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }
  title = 'Shoptiser';

  ngAfterViewInit() {
    Feather.replace();
  }

}

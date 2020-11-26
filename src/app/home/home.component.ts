import { Component, OnInit } from '@angular/core';
import { HomeService } from '../admin/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoading = false;
  title : string ;
  description :string;

  constructor(public homeService :HomeService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.homeService.getMeta().subscribe(metaData =>{
      console.log(metaData);
      this.isLoading= false;
      this.description = metaData.welcomeDescription;
      this.title =metaData.welcomeTitle
      
      });
  }

}

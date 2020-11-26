import { Component, OnInit } from '@angular/core';
import { HomeService } from '../admin/home/home.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isLoading = false;
  title : string ;
  logoImage :string;

  constructor(public homeService :HomeService) { }

  ngOnInit(): void {
  this.bindData();
  }


  bindData(){
    this.isLoading = true;
    this.homeService.getMeta().subscribe(metaData =>{
      console.log(metaData);
      this.isLoading= false;
      this.logoImage = metaData.imageFaviconPath;
      this.title =metaData.title
      
      });
  }

}

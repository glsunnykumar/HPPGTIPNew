import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component'
import {MemberComponent} from './member/member.component'
import {NotificationComponent} from './notification/notification.component'
import {GalleryComponent} from './gallery/gallery.component'
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ContactComponent } from './contact/contact.component';
const routes: Routes = [

    // {path :'student/create' , component:StudentCreateComponent } ,
    // {path :'students' , component:StudentListComponent } ,
    // {path :'student/edit/:id', component:StudentCreateComponent},
    // {path :'student/marks/:id', component:StudentMarksComponent},
       {path :'' ,redirectTo :'admin' , pathMatch:'full'},
       {path :'home' , component:HomeComponent},
       {path :'members' , component:MemberComponent } ,
       {path :'notifications' , component:NotificationComponent } ,
       {path :'gallery' , component:GalleryComponent } ,
       {path :'login' , component:LoginComponent } ,
       {path :'signup' , component:SignupComponent } ,
       {path :'contact' , component:ContactComponent } 
    // {path :'create/lvl1' , component:CatCreate1Component } ,
    // {path :'create/lvl2' , component:CatCreate2Component } ,
    // {path :'create/lvl3' , component:CatCreate3Component } ,
    // {path :'catLvl1' , component:CatLvl1ListComponent } ,
    // {path :'catLvl2' , component:CatLvl2ListComponent } ,
    // {path :'catLvl3' , component:CatLvl3ListComponent } ,
    // {path :'edit/:id', component:CatCreateComponent},
    // {path :'editLvl1/:id', component:CatCreate1Component},
    // {path :'editLvl2/:id', component:CatCreate2Component},
    // {path :'editLvl3/:id', component:CatCreate3Component},
    // {path :'product/create' , component:ProductCreateComponent } ,
    // {path:'products',component:ProductListComponent},
    // {path :'product/edit/:id', component:ProductCreateComponent},
    // {path:'ipanel',component:SidebarComponent},
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  
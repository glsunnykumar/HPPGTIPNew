import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { HomeListComponent } from './home/home-list/home-list.component';
import { HomeAddComponent } from './home/home-add/home-add.component';
import { HomeEditComponent } from './home/home-edit/home-edit.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberAddComponent } from './members/member-add/member-add.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { NotificationListComponent } from './notification/notification-list/notification-list.component';
import { NotificationAddComponent } from './notification/notification-add/notification-add.component';
import { NotificationEditComponent } from './notification/notification-edit/notification-edit.component';
import { AchievmentListComponent } from './achievment/achievment-list/achievment-list.component';
import { AchievmentAddComponent } from './achievment/achievment-add/achievment-add.component';
import { AchievmentEditComponent } from './achievment/achievment-edit/achievment-edit.component';
import { GalleryListComponent } from './gallery/gallery-list/gallery-list.component';
import { GalleryAddComponent } from './gallery/gallery-add/gallery-add.component';
import { GalleryEditComponent } from './gallery/gallery-edit/gallery-edit.component';
import { ContactAddComponent } from './contact/contact-add/contact-add.component';
import { HomeMetaComponent } from './home/home-meta/home-meta.component';


const routes :Routes =[
    { path:'admin' ,component:AdminComponent ,
    children :[
        {path :'',component:DashboardComponent},
        {path :'meta' , component:HomeMetaComponent},

        {path :'home' , component:HomeListComponent},
        {path :'home/create' , component:HomeAddComponent},
        {path :'home/edit/:id' , component:HomeEditComponent},

        {path :'members' , component:MemberListComponent},
        {path :'member/create' , component:MemberAddComponent},
        {path :'edit/:id' , component:MemberAddComponent},

        {path :'notification' , component:NotificationListComponent},
        {path :'notification/create' , component:NotificationAddComponent},
        {path :'notification/edit/:id' , component:NotificationAddComponent},

        {path :'achievment' , component:AchievmentListComponent},
        {path :'achievment/create' , component:AchievmentAddComponent},
        {path :'achievment/edit/:id' , component:AchievmentEditComponent},

        {path :'gallery' , component:GalleryListComponent},
        {path :'gallery/create' , component:GalleryAddComponent},
        {path :'gallery/edit/:id' , component:GalleryAddComponent},
        {path :'gallerys' , component:GalleryListComponent} ,
        {path :'contact' , component:ContactAddComponent}

    ]
    }
]

@NgModule({
imports : [RouterModule.forChild(routes)],
exports :[RouterModule]
})
export class AdminRoutingModule{}
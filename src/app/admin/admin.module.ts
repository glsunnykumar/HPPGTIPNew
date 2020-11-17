import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MembersComponent } from './members/members.component';
import { NotificationComponent } from './notification/notification.component';
import { GalleryComponent } from './gallery/gallery.component';
import {AdminRoutingModule} from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatMenuModule} from '@angular/material/menu';
import { DashboardComponent } from './dashboard/dashboard.component';
@NgModule({
  declarations: [AdminComponent,HomeComponent, MembersComponent, NotificationComponent, GalleryComponent, HeaderComponent, SidebarComponent, DashboardComponent],
  imports :[RouterModule, AdminRoutingModule, CommonModule ,MatTreeModule,MatMenuModule]
})

export class AdminModule{}
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MembersComponent } from './members/members.component';
import { NotificationComponent } from './notification/notification.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeAddComponent } from './home/home-add/home-add.component';
import { HomeListComponent } from './home/home-list/home-list.component';
import { HomeEditComponent } from './home/home-edit/home-edit.component';
import { ChartsModule } from 'ng2-charts';
import { MemberAddComponent } from './members/member-add/member-add.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { NotificationAddComponent } from './notification/notification-add/notification-add.component';
import { NotificationEditComponent } from './notification/notification-edit/notification-edit.component';
import { NotificationListComponent } from './notification/notification-list/notification-list.component';
import { AchievmentAddComponent } from './achievment/achievment-add/achievment-add.component';
import { AchievmentListComponent } from './achievment/achievment-list/achievment-list.component';
import { AchievmentEditComponent } from './achievment/achievment-edit/achievment-edit.component';
import { GalleryAddComponent } from './gallery/gallery-add/gallery-add.component';
import { GalleryEditComponent } from './gallery/gallery-edit/gallery-edit.component';
import { GalleryListComponent } from './gallery/gallery-list/gallery-list.component';
import { ContactAddComponent } from './contact/contact-add/contact-add.component';
import { HomeMetaComponent } from './home/home-meta/home-meta.component';

import { MatCardModule } from '@angular/material/card';
import { MatTreeModule } from '@angular/material/tree';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LoadingSpinnerComponent } from '../common/loading-spinner/loading-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatNativeDateModule } from '@angular/material/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
@NgModule({
  declarations: [AdminComponent,
    HomeComponent,
    MembersComponent,
    NotificationComponent,
    GalleryComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    HomeAddComponent,
    HomeListComponent,
    HomeEditComponent,
    MemberAddComponent,
    MemberListComponent,
    MemberEditComponent,
    NotificationAddComponent,
    NotificationEditComponent,
    NotificationListComponent,
    AchievmentAddComponent,
    AchievmentListComponent,
    AchievmentEditComponent,
    GalleryAddComponent,
    GalleryEditComponent,
    GalleryListComponent,
    ContactAddComponent,
    HomeMetaComponent],
  imports: [RouterModule,
    MatTableModule,
    MatNativeDateModule,
    MatPaginatorModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatTreeModule,
    MatMenuModule,
    MatIconModule,
    ChartsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    PdfViewerModule
  ]
})

export class AdminModule { }
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ConfirmBoxComponent, ConfirmDialogModel } from 'src/app/common/confirm-box/confirm-box.component';
import { Notification } from '../notification.model';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  displayedColumns: string[] = ['srNo','Title' ,'Date','action'];
  
  pdfSource =  "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  result: string = '';
  imagePreview: string ='../../../../assets/Images/pdf.jfif';
  notifications: Notification[] = [];
   isLoading = false;
  dataSource =null;
  private notificationSubs: Subscription;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  constructor(public notificationService: NotificationService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.notificationService.getNotifications();
    this.notificationSubs = this.notificationService.getNotificationUpdatedListner().subscribe((notification:Notification[])=>{
      this.isLoading = false;
      this.notifications = notification;
      this.dataSource = new MatTableDataSource<Notification>(this.notifications);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  confirmDialog(catId: string ,catName:string): void {
    const message = 'Are you sure you want to delete Notification?' +catName;
 
    const dialogData = new ConfirmDialogModel("Delete Notification", message);
 
    const dialogRef = this.dialog.open(ConfirmBoxComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log(dialogResult)
      if(dialogResult){
     // this.categoryService.deleteCategory(catId);
      }
    });
  }

  ngOnDestroy() {
    this.notificationSubs.unsubscribe();
  }

}

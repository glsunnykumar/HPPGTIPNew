import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../admin/notification/notification.service';
import { Notification } from '../admin/notification/notification.model';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications : Notification[];
  isLoading = false;
  constructor(public notificationService :NotificationService) { }

  ngOnInit(): void {
    this.notificationService.getNotifications();
    this.notificationService.getNotificationUpdatedListner().subscribe((notification :Notification[])=>{
      this.isLoading= false;
      this.notifications= notification;
    })
  }

}

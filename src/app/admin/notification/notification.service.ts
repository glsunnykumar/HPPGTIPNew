import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { Router } from '@angular/router';

import {Notification} from './notification.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })

  export class NotificationService{
    private notifications: Notification[] = [];
    private   notificationUpdated = new Subject<Notification[]>();

    constructor(private http: HttpClient, private router: Router) { }

    addNotification(title: string, description: string, image: File,date: string) {
      const notificationData = new FormData();
      notificationData.append("title", title);
      notificationData.append("image", image, title);
      notificationData.append("description", description);
      notificationData.append("date", date);
      this.http.post<{ message: string, notification: Notification }>('http://localhost:3000/api/notification',
        notificationData)
        .subscribe((responseData) => {
          console.log(responseData);
          const notification: Notification = { id: responseData.notification.id, title: title, description: description, file: responseData.notification.file,date :date };
          console.log(responseData.message);
          window.alert('The notification has been added!');
          this.notifications.push(notification);
          this.notificationUpdated.next([...this.notifications]);
          this.router.navigate(["/admin/notification"]);
        });
  
    }

    getNotificationUpdatedListner() {
      return this.notificationUpdated.asObservable();
    }

    getNotifications(){
      this.http.get<{ message: string, notification: any }>('http://localhost:3000/api/notification')
      .pipe(map((notificationData) => {
        console.log(notificationData);
        return notificationData.notification.map(notification => {
          return {
            title: notification.title,
            file: notification.file,
            id: notification._id,
            description: notification.description,
            date :notification.date
          };
        });
      }))
      .subscribe(TransformedcatData => {
        //console.log(TransformedcatData);
        this.notifications = TransformedcatData;
        this.notificationUpdated.next([...this.notifications]);
      });
    }

    getnotification(id:string){
      return this.http.get<{ _id: string, title: string, description: string, file: string ,date : string}>('http://localhost:3000/api/notification/' + id)
    }

    deleteNotification(id: string) {
      this.http.delete('http://localhost:3000/api/notification/' + id)
        .subscribe(() => {
          const updatedMember = this.notifications.filter(mem => mem.id != id);
          this.notifications = updatedMember;
          this.notificationUpdated.next([...this.notifications]);
          //console.log('Deleted !');
        })
    }

  }
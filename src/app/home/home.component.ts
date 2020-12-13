import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { HomeService } from '../admin/home/home.service';
import { Member } from '../admin/members/member.model';
import { Notification } from '../admin/notification/notification.model';
import { MemberService } from '../admin/members/member.service';
import { NotificationService } from '../admin/notification/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
    // animation triggers go here
  ]
})
export class HomeComponent implements OnInit {

  members : Member[] ;
  notifications : Notification[];
  messages  =[{from :'gulshna' , subject :"i love programs"}];

  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  isLoading = false;
  title : string ;
  description :string;

  constructor(public homeService :HomeService ,public memberService :MemberService,public notificationService :NotificationService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.homeService.getMeta().subscribe(metaData =>{
      console.log(metaData);
      this.isLoading= false;
      this.description = metaData.welcomeDescription;
      this.title =metaData.welcomeTitle
      
      });

      this.memberService.getMembers();
      this.memberService.getMemberUpdatedListner().subscribe((member :Member[])=>{
        this.members= member;
      })

      this.notificationService.getNotifications();
      this.notificationService.getNotificationUpdatedListner().subscribe((notification :Notification[])=>{
        this.notifications= notification;
      })
      
  }

}

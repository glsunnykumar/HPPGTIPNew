import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

import {Member} from '../member.model';
import { MemberService } from '../member.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmBoxComponent, ConfirmDialogModel } from 'src/app/common/confirm-box/confirm-box.component';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  displayedColumns: string[] = ['srNo','imageUrl','Name' ,'Role' ,'District','action'];
  
  result: string = '';
 
  members: Member[] = [];
   isLoading = false;
  dataSource =null;
  private memberSubs: Subscription;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  constructor(public memberService: MemberService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.memberService.getMembers();
    this.memberSubs = this.memberService.getMemberUpdatedListner().subscribe((member:Member[])=>{
      this.isLoading = false;
      this.members = member;
      this.dataSource = new MatTableDataSource<Member>(this.members);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  confirmDialog(catId: string ,catName:string): void {
    const message = 'Are you sure you want to delete Member?' +catName;
 
    const dialogData = new ConfirmDialogModel("Delete Member", message);
 
    const dialogRef = this.dialog.open(ConfirmBoxComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log(dialogResult)
      if(dialogResult){
         this.memberService.deleteMember(catId);
      }
    });
  }

  ngOnDestroy() {
    this.memberSubs.unsubscribe();
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Member } from '../admin/members/member.model';
import { MemberService } from '../admin/members/member.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  displayedColumns: string[] = ['srNo','imageUrl','Name' ,'Role' ,'District'];
  
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

}

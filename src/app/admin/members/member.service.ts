import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { Router } from '@angular/router';

import {Member} from './member.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })

  export class MemberService{
    private members: Member[] = [];
    private   memberUpdated = new Subject<Member[]>();

    constructor(private http: HttpClient, private router: Router) { }

    getMemberUpdatedListner() {
        return this.memberUpdated.asObservable();
      }

      getMembers(){
        this.http.get<{ message: string, member: any }>('http://localhost:3000/api/member')
        .pipe(map((memberData) => {
          console.log(memberData);
          return memberData.member.map(member => {
            return {
              MemberName: member.MemberName,
              MemberImage: member.MemberImage,
              id: member._id,
              MemberRole: member.MemberRole,
              MemberDistrict :member.MemberDistrict
            };
          });
        }))
        .subscribe(TransformedcatData => {
          //console.log(TransformedcatData);
          this.members = TransformedcatData;
          this.memberUpdated.next([...this.members]);
        });
      }
      getMember(id: string) {
        return this.http.get<{ _id: string, MemberName: string, MemberRole: string, MemberImage: string ,MemberDistrict : string}>('http://localhost:3000/api/member/' + id)
      }

      addMember(name: string, role: string, image: File,district: string) {
        const meberData = new FormData();
        meberData.append("name", name);
        meberData.append("role", role);
        meberData.append("image", image, name);
        meberData.append("district", district);
        this.http.post<{ message: string, member: Member }>('http://localhost:3000/api/member',
          meberData)
          .subscribe((responseData) => {
            console.log(responseData);
            const member: Member = { id: responseData.member.id, MemberName: name, MemberRole: role, MemberImage: responseData.member.MemberImage, MemberDistrict: responseData.member.MemberDistrict };
            console.log(responseData.message);
            window.alert('The member has been added!');
            this.members.push(member);
            this.memberUpdated.next([...this.members]);
            this.router.navigate(["/admin/members"]);
          });
    
      }

      updateMember(id: string, name: string, role: string, image: File | string,district: string) {
        let memberData: Member | FormData;

        if(typeof(image) === 'object'){
          memberData = new FormData();
          memberData.append("id",id);
          memberData.append("name",name);
          memberData.append("image",image,name);
          memberData.append("role",role);
        }
        else {
          memberData ={
            id :id,
            MemberName :name,
            MemberRole : role,
            MemberDistrict :district,
            MemberImage : image
          }
        }
        this.http.put('http://localhost:3000/api/member/' + id, memberData)
        .subscribe(response =>{
          const updatedMember= [...this.members];
          const oldMember = updatedMember.findIndex(p=>p.id ===id);
          const member:Member ={
            id :id,
            MemberName :name,
            MemberRole : role,
            MemberDistrict :district,
            MemberImage : "response.MemberImage"
          }
          updatedMember[oldMember] =member;
          this.members = updatedMember;
          this.memberUpdated.next([...this.members]);
          this.router.navigate(["/admin/members"]);
        })

      }

      deleteMember(id: string) {
        this.http.delete('http://localhost:3000/api/member/' + id)
          .subscribe(() => {
            const updatedMember = this.members.filter(mem => mem.id != id);
            this.members = updatedMember;
            this.memberUpdated.next([...this.members]);
            //console.log('Deleted !');
          })
      }

  }
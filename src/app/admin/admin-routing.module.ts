import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';


const routes :Routes =[
    { path:'admin' ,component:AdminComponent ,
    children :[
        {path :'',component:HomeComponent},
        {path :'home' , component:HomeComponent}
    ]

    }
]

@NgModule({
imports : [RouterModule.forChild(routes)],
exports :[RouterModule]
})
export class AdminRoutingModule{}
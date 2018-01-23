
import { Component, OnInit,NgModule } from '@angular/core';

import { Router } from '@angular/router';

import { RegService } from './reg.service';

import {BrowserModule} from '@angular/platform-browser'
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Reg } from './reg';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers :[RegService]
})
export class RegisterComponent implements OnInit {

  nm:string
  em:string
  st: string
  resMsg: string
  states: any;
  abc : string
  constructor(
    private router : Router,
    private http : HttpClient,
    private Register : RegService
  ) {
    this.abc="Maharashtra"
    this.http.get('http://localhost:3000/reg')
    .subscribe(data => {
      console.log(data)
       this.states =data
    });
   }

  ngOnInit() {
  }

  onRegister(name:string,email:string,state:string,password:string){
    let reg= new Reg()
    reg.name=name
    reg.email=email
    reg.state=state
    reg.password=password
    console.log(name,email,state,password)
    this.Register.performOperation(reg, result=>{
      console.log(result)
      if(result.sts==200){
        this.resMsg="Record Save Successfully";
        this.router.navigate(['register'])
        location.reload();
      }
    });
  }
  onSelect1(email:string){
    
    let reg1= new Reg()
    reg1.email=email
    
    this.Register.selectData(reg1,result=>{
      console.log(result)
      this.nm=result.name
      this.em=result.email
      this.st=result.state
    })
    
  }
  onEdit(name:string,email:string,state:string,password:string){
    let reg= new Reg()
    reg.name=name
    reg.email=email
    reg.state=state
    reg.password=password
    console.log(name,email,state,password)
    this.Register.editOperation(reg, result=>{
      console.log(result)
      if(result.ok==1){
        this.resMsg="Record Update Successfully";
        this.router.navigate(['register'])
        location.reload();
      }
    });
  }
  onDelete(name:string,email:string,state:string,password:string){
    let reg= new Reg()
    reg.name=name
    reg.email=email
    reg.state=state
    reg.password=password
    console.log(name,email,state,password)
    this.Register.deleteOperation(reg, result=>{
      console.log(result)
      if(result.ok==1){
        this.resMsg="Record Deleted Successfully";
        this.router.navigate(['register'])
        location.reload();
      }
    });
  }

}

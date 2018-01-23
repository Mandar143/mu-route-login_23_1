import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LgnService } from './lgn.service';
import { Calc } from './calc';

@Component({
  selector: 'app-lgn',
  templateUrl: './lgn.component.html',
  styleUrls: ['./lgn.component.css'],
  providers: [LgnService]
})
export class LgnComponent implements OnInit {
 
  resMsg: string;
  constructor(
    
    private router : Router,
    private lgnn: LgnService
  )
   { }

  ngOnInit() {
  }

  go(usNm : string, pwd:string){
    let clc = new Calc()
    clc.usNm = usNm
    clc.pwd = pwd
    this.lgnn.performOperation(clc, result => {
      console.log(result.res)
      if(result.res===usNm){
        this.router.navigate(['dash',result.res ])
      }
      else{
        this.router.navigate(['err'])
      }
     
    });
    
  }
}

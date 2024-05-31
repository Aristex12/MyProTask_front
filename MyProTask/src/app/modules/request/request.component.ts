import { Component } from '@angular/core';
import { Requests } from 'src/app/models/request';
import { RequestService } from 'src/app/servicios/request/request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {

  requestList:Requests[]= []
  constructor(private requestService:RequestService) { }

  ngOnInit(): void {
    this.getRequestByIdUser();
    console.log(this.requestList)

  }

  getRequestByIdUser() {
    this.requestService.getRequestByIdUser().subscribe({
      next: (requests:any) => {
        this.requestList = requests;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  } 

  deleteRequest(idRequest:number){
    this.requestService.deleteRequest(idRequest).subscribe({
      next: (response:any)=>{
        this.getRequestByIdUser();
      },
      error: (error:any)=>{
      }
    })
  }

}

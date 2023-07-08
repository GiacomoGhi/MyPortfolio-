import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'portfolio-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent{
  title = 'GG-portfolio';  
  
  constructor(private modalService: NgbModal) {

  }

  public open(modal: any): void {

    this.modalService.open(modal);

  }
}

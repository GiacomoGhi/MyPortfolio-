import { Component, ViewChild, ElementRef, AfterViewInit, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'portfolio-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.sass']
})
export class CoreComponent implements AfterViewInit {

  @ViewChild('aboutComponent', { static: false }) aboutEl!: ElementRef;
  @ViewChild('skillsComponent', { static: false }) skillsEl!: ElementRef;
  @ViewChild('resumeComponent', {static: false}) resumeEl!: ElementRef;
  @ViewChild('portfolioComponent', {static: false}) portfolioEl!: ElementRef;
  @ViewChild('contactComponent', {static: false}) contactEl!: ElementRef;
  
  
  elements: Element[] = [];

  ngAfterViewInit(): void {
    this.elements  = [
      this.aboutEl.nativeElement,
      this.skillsEl.nativeElement, 
      this.resumeEl.nativeElement,
      this.portfolioEl.nativeElement,
      this.contactEl.nativeElement,
    ]
    this.sendData(this.elements);
  }

  @Output() coreEvent = new EventEmitter<Element[]>()

  sendData(data: Element[]){
    this.coreEvent.emit(data)
  }

}

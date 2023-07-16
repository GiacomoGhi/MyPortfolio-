import { Component, ViewChild, Renderer2, ElementRef, HostListener, AfterViewInit, AfterContentInit  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'portfolio-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent 
implements AfterViewInit, AfterContentInit{
  title = 'GG-portfolio'; 
  headerLinkElements!: Element[]
  coreElements!: Element[]
  highlightedNavLink!: Element;
  contentReady:boolean = false;

  @ViewChild('tallComponent', {static: false}) prova!: ElementRef;

  constructor(private modalService: NgbModal, private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    this.highlightedNavLink = this.headerLinkElements[0];
    this.checkElementVisibility();
  }

  receiveData($event: Element[]){
    this.headerLinkElements = $event 
    
  }
  
  receiveCoreData($coreEvent: Element[]){
    this.coreElements = $coreEvent
    
  }

  @HostListener('window:scroll', ['$event'])
  logMe(){
    this.checkElementVisibility();
  }

  checkElementVisibility() {
    const rectHome: DOMRect[] = [ 
      this.headerLinkElements[0].getBoundingClientRect(),
      this.coreElements[0].getBoundingClientRect(),
      this.coreElements[1].getBoundingClientRect(),
      this.coreElements[2].getBoundingClientRect(),
      this.coreElements[3].getBoundingClientRect(),
      this.coreElements[4].getBoundingClientRect(),
    ]       
    const isHomeVisible: boolean[] = [
      rectHome[0].top < window.innerHeight && rectHome[0].bottom >= 0,
      rectHome[1].top < window.innerHeight && rectHome[1].bottom >= 0,
      rectHome[2].top < window.innerHeight && rectHome[2].bottom >= 0,
      rectHome[3].top < window.innerHeight && rectHome[3].bottom >= 0,
      rectHome[4].top < window.innerHeight && rectHome[4].bottom >= 0,
      rectHome[5].top < window.innerHeight && rectHome[5].bottom >= 0,
    ] 
  
    if (isHomeVisible[0]) {
      this.renderer.removeClass(this.highlightedNavLink, 'hover-effect');
      this.renderer.addClass(this.headerLinkElements[1], 'hover-effect');
      this.highlightedNavLink = this.headerLinkElements[1];
    } else if (isHomeVisible[1]) {
      this.renderer.removeClass(this.highlightedNavLink, 'hover-effect');
      this.renderer.addClass(this.headerLinkElements[2], 'hover-effect');
      this.highlightedNavLink = this.headerLinkElements[2];
    } else if (isHomeVisible[2]) {
      this.renderer.removeClass(this.highlightedNavLink, 'hover-effect');
      this.renderer.addClass(this.headerLinkElements[3], 'hover-effect');
      this.highlightedNavLink = this.headerLinkElements[3];
    } else if (isHomeVisible[3]) {
      this.renderer.removeClass(this.highlightedNavLink, 'hover-effect');
      this.renderer.addClass(this.headerLinkElements[4], 'hover-effect');
      this.highlightedNavLink = this.headerLinkElements[4];
    } else if (isHomeVisible[4]) {
      this.renderer.removeClass(this.highlightedNavLink, 'hover-effect');
      this.renderer.addClass(this.headerLinkElements[5], 'hover-effect');
      this.highlightedNavLink = this.headerLinkElements[5];
    } else if (isHomeVisible[5]) {
      this.renderer.removeClass(this.highlightedNavLink, 'hover-effect');
      this.renderer.addClass(this.headerLinkElements[6], 'hover-effect');
      this.highlightedNavLink = this.headerLinkElements[6];
    }
  }  

  public open(modal: any): void {

    this.modalService.open(modal);

  }

  ngAfterContentInit(): void {
    this.contentReady = true;
  }
}

import { Component, AfterViewInit, ViewChild, ElementRef, HostListener, OnInit, Renderer2, EventEmitter, Output, DoCheck} from '@angular/core';

@Component({
  selector: 'portfolio-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent  
implements AfterViewInit, OnInit//, DoCheck
{
  imgPath = "../../../assets/img/";

  @ViewChild('typingText', { static: false }) typingText!: ElementRef;

  @ViewChild('tallComponent', { static: false }) tallComponent!: ElementRef;
  @ViewChild('homeEl', {static: false}) homeElink!: ElementRef;
  @ViewChild('homeEl1', {static: false}) aboutElink!: ElementRef;
  @ViewChild('homeEl2', {static: false}) skillsElink!: ElementRef;
  @ViewChild('homeEl3', {static: false}) resumeElink!: ElementRef;
  @ViewChild('homeEl4', {static: false}) portfolioEllink!: ElementRef;
  @ViewChild('homeEl5', {static: false}) contactEllink!: ElementRef;
  @ViewChild('homeElTop', {static: false}) homeElinkTop!: ElementRef;
  @ViewChild('homeElTop1', {static: false}) abountElinkTop!: ElementRef;
  @ViewChild('homeElTop2', {static: false}) skillsElinkTop!: ElementRef;
  @ViewChild('homeElTop3', {static: false}) resumeElinkTop!: ElementRef;
  @ViewChild('homeElTop4', {static: false}) portfolioElinkTop!: ElementRef;
  @ViewChild('homeElTop5', {static: false}) contactElinkTop!: ElementRef;

  textToType = 'I\'m a Front-end Dev.';
  textToType2 = "I'm Giacomo Ghinelli.";
  texts: string[] = [this.textToType, this.textToType2];
  typingSpeed = 100; 
  delayAfterComplete = 1500; 
  isMedium!: boolean;
  menuIcon = true;
  bornLarge = true;
  elements!: Element[]
  viewSize!: number
  
  constructor(private elementRef: ElementRef, private linkEl: ElementRef, private topLinkEl: ElementRef, private renderer: Renderer2) {
  }
  
  @HostListener('window:scroll', ['$event'])
  logMe(){
    this.checkElementVisibility();
  }

  checkElementVisibility() {
    const element: Element = this.elementRef.nativeElement;
    let currentView!: Element;
    const rectHome = element.getBoundingClientRect();
    try {
      var spy: Element = this.linkEl.nativeElement;
      
      var isHomeVisible: boolean[] = [
      rectHome.top < window.innerHeight && rectHome.bottom >= 0,
    ]
    } catch (error) {
      return;
    }

    
  
    if (isHomeVisible[0]) {
      this.renderer.addClass(spy, 'hover-effect');
    } else if (isHomeVisible[1]) {
      this.renderer.removeClass(spy, 'hover-effect');
    }
  }  

  ngOnInit(): void {
    this.isMedium = ( window.innerWidth >= 992 )
    this.bornLarge = this.isMedium 
    this.viewSize = window.innerWidth;
    
  }
  
  ngAfterViewInit(): void {
    this.startTyping();
    this.elementRef = this.tallComponent;

    if(this.isMedium){
      this.elements = [
        this.tallComponent.nativeElement,
        this.homeElink.nativeElement,
        this.aboutElink.nativeElement,
        this.skillsElink.nativeElement,
        this.resumeElink.nativeElement,
        this.portfolioEllink.nativeElement,
        this.contactEllink.nativeElement,
      ]
    }
    else {
      this.elements = [
        this.tallComponent.nativeElement,
        this.homeElinkTop.nativeElement,
        this.abountElinkTop.nativeElement,
        this.skillsElinkTop.nativeElement,
        this.resumeElinkTop.nativeElement,
        this.portfolioElinkTop.nativeElement,
        this.contactElinkTop.nativeElement,
      ]
    }
    this.sendData(this.elements);
    this.checkElementVisibility();
  }

  sleepToLoadEl = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

  loadElWithDelay = (element: ElementRef, status: boolean) =>{
    this.linkEl = element;
    this.linkEl = element;
    this.bornLarge = status;
    this.checkElementVisibility();
  }

  startTyping(): void {
    const textElement = this.typingText.nativeElement;
    let i = 0;
    let isTypingComplete = false, go=true, firstText=true;

    const wait = async () => {
      await this.sleepToLoadEl(this.delayAfterComplete);
      go = true;
    }

    const typeInterval = setInterval(() => {
      let tempString:string;
      if(firstText) tempString = this.texts[0];
      else tempString = this.texts[1];
      if (!isTypingComplete && go) {
        textElement.textContent += tempString.charAt(i);
        i++;
        isTypingComplete = !(i < tempString.length);
        if(isTypingComplete)
           go = false;
        if(!go)wait();
      } else if (go) {
        textElement.textContent = tempString.substring(0, i-1);
        i--;
        if(i===0) firstText = !firstText;
        isTypingComplete = !(i === 0);
      }
    }, this.typingSpeed);
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMedium = ( window.innerWidth >= 992 )/*  
    if(this.isMedium){
      try {
        this.elements = [
          this.tallComponent.nativeElement,
          this.homeElink.nativeElement,
          this.aboutElink.nativeElement,
          this.skillsElink.nativeElement,
          this.resumeElink.nativeElement,
          this.portfolioEllink.nativeElement,
          this.contactEllink.nativeElement,
        ]
      } catch (error) {
        return;
      }
      this.sendData(this.elements);
    } else {
      try {
        this.elements = [
          this.tallComponent.nativeElement,
          this.homeElinkTop.nativeElement,
          this.abountElinkTop.nativeElement,
          this.skillsElinkTop.nativeElement,
          this.resumeElinkTop.nativeElement,
          this.portfolioElinkTop.nativeElement,
          this.contactElinkTop.nativeElement,
        ]
      } catch (error) {
        return;
      }
      this.sendData(this.elements);
      //this.loadElWithDelay(this.homeElTop, false);
    }*/

  }

  changeIcon(){
    this.menuIcon = !this.menuIcon;
  }

  @Output() event = new EventEmitter<Element[]>()

  sendData(data: Element[]){
    this.event.emit(data)
  }

  ngDoCheck(): void {
    if(this.isMedium){
      try {
        this.elements = [
          this.tallComponent.nativeElement,
          this.homeElink.nativeElement,
          this.aboutElink.nativeElement,
          this.skillsElink.nativeElement,
          this.resumeElink.nativeElement,
          this.portfolioEllink.nativeElement,
          this.contactEllink.nativeElement,
        ]
      } catch (error) {
        return;
      }
      this.sendData(this.elements);
    } else {
      try {
        this.elements = [
          this.tallComponent.nativeElement,
          this.homeElinkTop.nativeElement,
          this.abountElinkTop.nativeElement,
          this.skillsElinkTop.nativeElement,
          this.resumeElinkTop.nativeElement,
          this.portfolioElinkTop.nativeElement,
          this.contactElinkTop.nativeElement,
        ]
      } catch (error) {
        return;
      }
      this.sendData(this.elements);
      //this.loadElWithDelay(this.homeElTop, false);
    }
  }
}

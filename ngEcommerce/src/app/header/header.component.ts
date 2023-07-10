import { Component, AfterViewInit, ViewChild, ElementRef, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'portfolio-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent  implements AfterViewInit, OnInit{
  imgPath = "../../../assets/img/";

  @ViewChild('typingText', { static: false }) typingText!: ElementRef;

  textToType = 'I\'m a Front-end Dev.';
  textToType2 = "I'm Giacomo Ghinelli.";
  texts: string[] = [this.textToType, this.textToType2];
  typingSpeed = 100; 
  delayAfterComplete = 1500; 
  isMedium!: boolean;

  ngOnInit(): void {
    this.isMedium = ( window.innerWidth >= 992 )
  }
  
  ngAfterViewInit(): void {
    this.startTyping();
  }

  startTyping(): void {
    const textElement = this.typingText.nativeElement;
    let i = 0;
    let isTypingComplete = false, go=true, firstText=true;
    const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

    const wait = async () => {
      await sleep(this.delayAfterComplete);
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
    this.isMedium = ( window.innerWidth >= 992 )
  }
  
  /*
  ngAfterViewInit(): void {

    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = Array.from(popoverTriggerList).map(function (popoverTriggerEl) {
      return new Popover(popoverTriggerEl, {trigger: 'hover', customClass: 'data-bs-custom-class',});
  });*/

}

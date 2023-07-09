import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Popover } from 'bootstrap';

@Component({
  selector: 'portfolio-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent  implements AfterViewInit {
  imgPath = "../../../assets/img/";

  @ViewChild('typingText', { static: false }) typingText!: ElementRef;

  textToType = 'Welcome to my website!';
  typingSpeed = 100; // Adjust the typing speed by changing the delay (in milliseconds)
  delayAfterComplete = 1500; // Adjust the delay before restarting the typing animation (in milliseconds)

  ngAfterViewInit(): void {
    this.startTyping();
  }

  startTyping(): void {
    const textElement = this.typingText.nativeElement;
    let i = 0;
    let isTypingComplete = false, go=true;
    const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

    const wait = async () => {
      await sleep(this.delayAfterComplete);
      go = true;
    }

    const typeInterval = setInterval(() => {
      if (!isTypingComplete && go) {
        textElement.textContent += this.textToType.charAt(i);
        i++;
        isTypingComplete = !(i < this.textToType.length);
        if(isTypingComplete) go = false;
        if(!go)wait();
      } else if (go) {
        textElement.textContent = this.textToType.substring(0, i-1);
        i--;
        isTypingComplete = !(i === 0);
      }
    }, this.typingSpeed);
  }
  
  
  /*
  ngAfterViewInit(): void {

    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = Array.from(popoverTriggerList).map(function (popoverTriggerEl) {
      return new Popover(popoverTriggerEl, {trigger: 'hover', customClass: 'data-bs-custom-class',});
  });*/

}

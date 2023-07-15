import { Component, ViewChild, ElementRef, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import  emailjs  from '@emailjs/browser';
import { ToastrService } from 'ngx-toastr';

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

  submitted = false;

  form: FormGroup = this.fb.group({
    from_name: '',
    from_email: '',
    message: ''
  })

  constructor(private fb: FormBuilder, private toastr: ToastrService){}

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

  showSuccess() {
    this.toastr.success(
      'Message has been sent successfully.\n' +
      'Thank you for reaching me out!\n'
    );
  }

  showError() {
    this.toastr.error(
      'ERROR! :(\n' +
      'Please, Contact me manually.\n'+
      'Thank you for your patience.'
    );
  }

  async sendEmail(){    
    this.submitted = true;
    emailjs.init('M-DaxoXwzKAw_kBBg');
    try {
      let response = await emailjs.send("service_r7zrtla","template_gj85zgd",{
        from_name: this.form.value.from_name,
        from_email: this.form.value.from_email,
        message: this.form.value.message,
      });

      this.submitted = false;

      if(response.text === "OK"){
        this.showSuccess();
      } else {
        this.showError();
      }

      this.form.reset();

    } catch(error) {
      this.showError();
    }
  }

}

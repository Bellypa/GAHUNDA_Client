import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
declare const $;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() backToHome = new EventEmitter<boolean>();
  credentials: any;
  phone: string;
  name: string;
  isSignUp: boolean;
  constructor(
    private authService: AuthService,
    private elm: ElementRef,
  ) {
    this.isSignUp = false;
    this.credentials = {};
  }

  ngOnInit() {
  }


  public onLogin(loginForm: NgForm) {
    this.credentials = Object.assign({}, loginForm.value);
    if (loginForm.invalid) {
      return;
    } else {
      this.authService.login(this.credentials)
        .subscribe((data) => {
          this.authService.setToken(data.token);
          this.close();
        },
          error => {
            console.log(error.error);
          }
        );
    }


  }


  close() {
    this.backToHome.emit(false);
  }


  onSinUpForm(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      let data = {
        phone: this.phone,
        name: this.name
      }
      this.authService.clientSinup(data)
        .subscribe(
          data => { this.closeSinup();},
          error => { }
        )
    }
  }


  closeSinup() {
    $(this.elm.nativeElement.querySelector('#signupbox')).modal('hide');
    $(this.elm.nativeElement.querySelector('#loginbox')).modal('show');
    this.isSignUp = false;

  }



  openSignUP() {
    $(this.elm.nativeElement.querySelector('#signupbox')).modal('show');
    $(this.elm.nativeElement.querySelector('#loginbox')).modal('hide');
    this.isSignUp = true;
  }



}

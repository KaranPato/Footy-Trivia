import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { Socialusers } from '../../models/socialUsers';
import { AuthenticationService } from '../../services/authentication.service';

import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  submitted = false;
  submittedR = false;
  response: any;
  socialUser = Socialusers;
  currentBlock = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public OAuth: AuthService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(13)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  get l() { return this.loginForm.controls; }
  get r() { return this.registerForm.controls; }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const data = {
      email: this.l.email.value,
      password: this.l.password.value,
      provider: ''
    };

    this.authenticationService.Login(data).subscribe((response: any) => {
      if (response.isSuccess) {
        this.router.navigate(['/layout']);
      }
    });
  }

  register() {
    this.submittedR = true;

    if (this.registerForm.invalid) {
      return;
    }

    const data = {
      firstName: this.r.firstName.value,
      lastName: this.r.lastName.value,
      email: this.r.email.value,
      phoneNo: this.r.phoneNo.value,
      password: this.r.password.value,
      confirmPassword: this.r.confirmPassword.value
    };

    this.authenticationService.Register(data).subscribe((response: any) => {
      if (response.isSuccess) {
        this.router.navigate(['/login']);
      }
    });
  }

  keypressDigit(event: any) {
    if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode === 46) || (event.keyCode === 43)) {
      return true;
    }
    else {
      event.preventDefault();
    }
  }

  public socialSignIn(socialProvider: string) {
    let socialPlatformProvider: string;
    if (socialProvider === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialProvider === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.OAuth.signIn(socialPlatformProvider).then(socialusers => {
      // this.Savesresponse(socialusers);
      console.log(socialusers);
    });
  }
  Savesresponse(socialusers: any) {
    this.authenticationService.Login(socialusers).subscribe((res: any) => {
      console.log(res);
      this.socialUser = res;
      this.response = res.userDetail;
      localStorage.setItem('socialusers', JSON.stringify(this.socialUser));
    });
  }


  createNewAccount() {
    this.currentBlock = 'register';
  }
}

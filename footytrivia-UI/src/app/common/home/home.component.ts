import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  inputForm: FormGroup;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.inputForm = new FormGroup({
      username: new FormControl('', Validators.required)
   });
  }

  onSubmit() {
    if (this.inputForm.invalid)
      return;

    sessionStorage.setItem('username', this.inputForm.controls.username.value);

    this.router.navigate(['/layout']);

  }

}

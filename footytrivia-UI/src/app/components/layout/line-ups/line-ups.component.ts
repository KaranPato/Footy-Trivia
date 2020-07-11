import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-line-ups',
  templateUrl: './line-ups.component.html',
  styleUrls: ['./line-ups.component.css']
})
export class LineUpsComponent implements OnInit {
  inputForm: FormGroup;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.inputForm = new FormGroup({
      username: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.inputForm.invalid) {
      return;
    }

    sessionStorage.setItem('username', this.inputForm.controls.username.value);

    this.router.navigate(['/layout/questions']);

  }

}

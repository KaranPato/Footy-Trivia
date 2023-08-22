import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `<div id="flex-container">
  <app-header></app-header>
  <router-outlet></router-outlet>
  <div class="footer-section">
  <app-footer></app-footer>
  </div>
  </div>`
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

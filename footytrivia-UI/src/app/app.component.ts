import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'footytrivia-UI';

  throw(){
    throw new Error('Co tu się wyprawia')
  }
}

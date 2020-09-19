import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'sales-app';
  public name = 'Angular 9';
  public nameChange = 'Ajay';

  toggleName() {
    if (this.nameChange === 'Ajay') this.nameChange = 'Vijay';
    else this.nameChange = 'Ajay';
  }
}

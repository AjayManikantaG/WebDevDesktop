import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from './user';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-post-dealers',
  templateUrl: './post-dealers.component.html',
  styleUrls: ['./post-dealers.component.css'],
  encapsulation: ViewEncapsulation.Emulated 
})
export class PostDealersComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private _http: HttpService) {}

  title = 'tdf';
  districts = ['Chennai', 'Tirupathi', 'Madhurai', 'California'];
  userModel = new User(0, '', '', '');
  errMsg = '';
  sucMsg = '';
  event: boolean;

  log() {
    console.log('Button Clicked');
  }

  onSubmit() {
    // Data insertion
    this._http.enroll(this.userModel).subscribe(
      (data) => {
        this.sucMsg = data.message;
        setTimeout(() => {
          this.sucMsg = '';
        }, 5000);
      },
      (error) => {
        this.errMsg = error.error;
        setTimeout(() => {
          this.errMsg = '';
        }, 5000);
      }
    );
  }
}

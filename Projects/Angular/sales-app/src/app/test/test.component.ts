import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  @Input() public appName;
  public isFine = !false;
  public object1 = ["Ajay", "vijay", "Bhavya", "Rama"]

  constructor() { }

  ngOnInit(): void {
  }

}

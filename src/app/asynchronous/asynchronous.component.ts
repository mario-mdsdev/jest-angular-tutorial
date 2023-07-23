import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asynchronous',
  templateUrl: './asynchronous.component.html',
  styleUrls: ['./asynchronous.component.css']
})
export class AsynchronousComponent implements OnInit {

  timeoutResponse: string = 'test';

  constructor() { }

  ngOnInit(): void {
  
  }

  checkSetTimeout() {
    setTimeout(() => {
      this.timeoutResponse = 'setTimeoutCheck';
    }, 1000);
  }

}

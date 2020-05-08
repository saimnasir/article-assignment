import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  @ViewChild('toast') toast: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }
  show(){
  }
}

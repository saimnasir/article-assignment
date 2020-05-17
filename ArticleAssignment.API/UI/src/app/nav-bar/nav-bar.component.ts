import { Component, OnInit, ViewEncapsulation, AfterViewInit, Output, EventEmitter, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleListComponent } from '../article/article-list/article-list.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  navbarOpen = false;
  ngOnInit(): void {
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  search() {
  }

}




import { Component, OnInit, Input } from '@angular/core';
import { Author } from 'src/app/models/author.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor() { }

  @Input() author: Author;
  ngOnInit(): void {
  }

  getFullName(): string {
    if (this.author.middleName) {
      return `${this.author.firstName} ${this.author.middleName} ${this.author.lastName}`;
    }
    return `${this.author.firstName} ${this.author.lastName}`;
  }
}

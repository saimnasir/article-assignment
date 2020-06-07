

import { Component, OnInit, Input } from '@angular/core';
import { Author, AuthorFullName } from 'src/app/models/author.model';

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

  getAuthorFullName(): string {
    return AuthorFullName(this.author);
  }
}

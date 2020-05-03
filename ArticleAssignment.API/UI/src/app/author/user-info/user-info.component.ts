

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
  getFullName():string{
    return  this.author.FirstName.concat(' ', this.author.MiddleName ,' ' ,this.author.LastName);
  }
}

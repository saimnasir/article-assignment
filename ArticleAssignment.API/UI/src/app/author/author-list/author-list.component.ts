import { Component, OnInit } from '@angular/core'; 
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  constructor(public authorService: AuthorService) { }

  ngOnInit(): void {
    if (!this.authorService.authorList) {
      this.authorService.listAll();
    }
  }

}

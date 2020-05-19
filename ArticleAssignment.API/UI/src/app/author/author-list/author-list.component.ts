import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/services/author.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Author } from 'src/app/models/author.model';
import { SearchInputBase } from 'src/app/models/inputs/search-input-base.model';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  authorList: Author[];
  authorForm: FormGroup;
  searchForm: FormGroup;
  newAuthor = new Author();
  onCreate = false;
  isCollapsed = false;
  searchInput = new SearchInputBase();
  cardClass = '';

  constructor(public authorService: AuthorService) { }

  ngOnInit(): void {
    this.refreshList();
    this.createForm();
    this.createSearchForm();
  }

  refreshList() {
    this.authorService.listAllAsync().subscribe(list => {
      this.authorList = list;
    });
  }

  search() {
    if (this.searchForm.valid) {
      Object.assign(this.searchInput, this.searchForm.value);
      this.authorService.searchAsync(this.searchInput).subscribe(result => {
        this.authorList = result;
      });
    }
    else {
      alert('forms is in valid');
    }
  }

  create() {
    if (this.authorForm.valid) {
      Object.assign(this.newAuthor, this.authorForm.value);

      this.authorService.create(this.newAuthor).subscribe(result => {
        this.onCreate = !this.onCreate;
        this.refreshList();
        this.newAuthor = new Author();
      });
    }
    else {
      alert('forms is in valid');
    }
  }

  createForm() {
    this.authorForm = new FormGroup({
      id: new FormControl(0),
      firstName: new FormControl(),
      middleName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      about: new FormControl(),
      birthDate: new FormControl(new Date()),
      createDate: new FormControl(new Date()),
      updateDate: new FormControl()
    });
  }


  createSearchForm() {
    this.searchForm = new FormGroup({
      queryText: new FormControl()
    });
  }

  toggleCreate() {
    this.onCreate = !this.onCreate;
    if (this.onCreate) {
      this.isCollapsed = false;
    }
    this.cardClass = this.onCreate ? 'alert-light' : '';
  }
}

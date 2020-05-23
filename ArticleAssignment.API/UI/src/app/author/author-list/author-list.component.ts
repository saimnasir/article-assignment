import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthorService } from 'src/app/services/author.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Author } from 'src/app/models/author.model';
import { SearchInputBase } from 'src/app/models/inputs/search-input-base.model';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  authorList: Author[];
  authorForm: FormGroup;
  searchForm: FormGroup;
  isCollapsed = false;
  searchInput = new SearchInputBase('');
  modalConfig = new NgbModalConfig();

  constructor(
    public authorService: AuthorService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.refreshList();
    this.createForm();
  }

  refreshList() {
    this.authorService.listAllAsync().subscribe(list => {
      this.authorList = list;
    });
    this.createSearchForm();
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

  onCreate(modal: TemplateRef<any>) {
    this.createForm();
    this.modalConfig.ariaLabelledBy = 'modal-basic-title';
    this.modalConfig.size = 'xl';
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
    this.modalService.open(modal, this.modalConfig);
  }


  create() {
    if (this.authorForm.valid) {
      const newAuthor = new Author();
      Object.assign(newAuthor, this.authorForm.value);
      this.authorService.create(newAuthor).subscribe(result => {
        this.refreshList();
        this.modalService.dismissAll();
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
      updateDate: new FormControl(new Date())
    });
  }

  createSearchForm() {
    this.searchForm = new FormGroup({
      queryText: new FormControl()
    });
  }


  removeFilter() {
    this.refreshList();
    this.searchForm.reset();
  }

}

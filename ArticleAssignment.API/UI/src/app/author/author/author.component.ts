import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthorListComponent } from '../author-list/author-list.component';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  @Input() container: AuthorListComponent;

  @Input() author: Author;
  authorId: number;
  showForm = false;
  deleteMode = false;
  model = new Author();
  authorForm: FormGroup;
  header: string;
  cardClass = '';

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService
  ) { }

  ngOnInit(): void {
    this.authorId = +this.route.snapshot.paramMap.get('id');
    if (this.authorId) {
      this.read(this.authorId);
    } else {
      this.authorId = this.author.id;
    }
    this.header = this.getFullName();
    this.createForm();
  }

  getFullName(): string {
    if (this.author.middleName) {
      return `${this.author.firstName} ${this.author.middleName} ${this.author.lastName}`;
    }
    return `${this.author.firstName} ${this.author.lastName}`;
  }

  read(id: number): void {
    this.authorService.read(id)
      .subscribe(result => this.author = result);
  }

  toggleShowForm() {
    this.showForm = !this.showForm;
    this.setHeader();
  }

  update() {
    if (this.authorForm.valid) {
      Object.assign(this.model, this.authorForm.value);

      this.authorService.update(this.model).subscribe(result => {
        this.author = result;
        this.toggleShowForm();
        this.container.refreshList();
      });
    }
    else {
      alert('forms is in valid');
    }
  }

  toggleDeleteMode() {
    this.deleteMode = !this.deleteMode;
    this.setHeader();
  }

  delete() {
    this.authorService.delete(this.authorId).subscribe(result => {
      this.container.refreshList();
      this.toggleDeleteMode();
    });
  }

  createForm() {
    this.authorForm = new FormGroup({
      id: new FormControl(this.author.id),
      firstName: new FormControl(this.author.firstName),
      middleName: new FormControl(this.author.middleName),
      lastName: new FormControl(this.author.lastName),
      email: new FormControl(this.author.email),
      phone: new FormControl(this.author.phone),
      about: new FormControl(this.author.about),
      birthDate: new FormControl(this.author.birthDate),
      createDate: new FormControl(this.author.createDate),
      updateDate: new FormControl(this.author.updateDate)
    });
  }

  discard() {
    this.showForm = false;
    this.deleteMode = false;
    this.setHeader();
  }

  setHeader() {
    if (this.showForm) {
      this.header = `Edit ${this.getFullName()}`;
      this.cardClass = 'alert-light';
    } else if (this.deleteMode) {
      this.header = `Delete ${this.getFullName()}`;
      this.cardClass = 'alert-dark';
    } else {
      this.header = `${this.getFullName()}`;
      this.cardClass = '';
    }
  }
}

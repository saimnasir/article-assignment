import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthorListComponent } from '../author-list/author-list.component';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  @Input() container: AuthorListComponent;
  @Input() author: Author;

  authorId: number;
  authorForm: FormGroup;
  modalConfig = new NgbModalConfig();

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService,
    public modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.authorId = +this.route.snapshot.paramMap.get('id');
    if (this.authorId) {
      this.read(this.authorId);
    } else {
      this.authorId = this.author.id;
    }
  }

  onUpdate(modal: TemplateRef<any>) {
    this.createForm();
    this.modalConfig.ariaLabelledBy = 'modal-basic-title';
    this.modalConfig.size = 'xl';
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
    console.log('this.authorForm.value', this.authorForm.value);
    console.log('modal', modal);

    this.modalService.open(modal, this.modalConfig);
  }

  onDelete(modal: TemplateRef<any>) {
    this.modalConfig.ariaLabelledBy = 'modal-basic-title';
    this.modalConfig.size = 'xl';
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
    this.modalConfig.centered = false;
    this.modalService.open(modal, this.modalConfig);
  }

  update(x: any) {
    if (this.authorForm.valid) {
      const newAuthor = new Author();
      Object.assign(newAuthor, this.authorForm.value);
      this.authorService.create(newAuthor).subscribe(result => {
        this.author = result;
        this.modalService.dismissAll();
      });
    }
    else {
      alert('forms is in valid');
    }
  }

  delete() {
    this.authorService.delete(this.authorId).subscribe(result => {
      this.container.refreshList();
      this.modalService.dismissAll();
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
}

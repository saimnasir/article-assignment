import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { DialogComponent } from 'src/app/dialog/dialog/dialog.component';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  @ViewChild(DialogComponent, { static: true }) modal: DialogComponent;
  @Input() author: Author;
  authorId: number;
  showForm = false;
  isNew = true;
  model = new Author();
  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService) { }

  authorForm: FormGroup;

  ngOnInit(): void {
    this.authorId = +this.route.snapshot.paramMap.get('id');

    // this.isNew = +this.route.snapshot.paramMap.get('new');
    if (this.authorId) {
      this.read(this.authorId);
    } else {
      this.authorId = this.author.id;
    }
  }

  getFullName(): string {
    return this.author.firstName.concat(' ', this.author.middleName, ' ', this.author.lastName);
  }

  read(id: number): void {
    this.authorService.read(id)
      .subscribe(result => this.author = result);
  }

  toggleShowFrom() {
    this.createForm();
  }

  update() {
    console.log('this.authorForm', this.authorForm);

    if (this.authorForm.valid) {
      Object.assign(this.model, this.authorForm.value);

      this.authorService.update(this.model).subscribe(result => {
        this.author = result;
      });
    }
    else {
      alert('forms is in valid');
    }
  }

  delete() {
    this.authorService.delete(this.authorId).subscribe(result => {
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
    this.showForm = !this.showForm;
  }
}

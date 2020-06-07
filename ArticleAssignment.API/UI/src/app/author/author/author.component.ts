import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Author, AuthorFullName } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthorListComponent } from '../author-list/author-list.component';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CRUDActions } from 'src/app/models/enums/action.enum';
import { AuthorEditDialogComponent } from '../author-edit-dialog/author-edit-dialog.component';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  @Input() container: AuthorListComponent;
  @Input() author: Author;
  authorId: number;
  dialogConfig = new MatDialogConfig();

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.authorId = +this.route.snapshot.paramMap.get('id');
    if (this.authorId) {
      this.read(this.authorId);
    } else {
      this.authorId = this.author.id;
    }

    this.dialogConfig.minHeight = '80%';
    this.dialogConfig.width = '80%';
    this.dialogConfig.disableClose = false;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.hasBackdrop = false;
  }

  getAuthorFullName(): string {
    return AuthorFullName(this.author);
  }

  onUpdate() {
    this.dialogConfig.data = {
      author: this.author,
      container: this.container,
      action: CRUDActions.Update
    };
    this.dialog.open(AuthorEditDialogComponent, this.dialogConfig);
  }

  onDelete() {
    this.dialogConfig.data = {
      author: this.author,
      container: this.container,
      action: CRUDActions.Delete
    };
    this.dialog.open(AuthorEditDialogComponent, this.dialogConfig);
  }

  read(id: number): void {
    this.authorService.read(id)
      .subscribe(result => this.author = result);
  }
}

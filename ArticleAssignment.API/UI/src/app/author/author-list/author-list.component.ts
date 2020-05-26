import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthorService } from 'src/app/services/author.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Author } from 'src/app/models/author.model';
import { SearchInputBase } from 'src/app/models/inputs/search-input-base.model';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AuthorEditDialogComponent } from '../author-edit-dialog/author-edit-dialog.component';
import { CRUDActions } from 'src/app/models/enums/action.enum';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  authorList: Author[];
  searchForm: FormGroup;
  isCollapsed = false;
  searchInput = new SearchInputBase('');
  modalConfig = new NgbModalConfig();

  constructor(
    public authorService: AuthorService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '60%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      author: null,
      container: this,
      action: CRUDActions.Create
    };
    this.dialog.open(AuthorEditDialogComponent, dialogConfig);
  }

  refreshList() {
    this.authorService.listAllAsync().subscribe(list => {
      this.authorList = list;
    });
    this.createSearchForm();
  }

  search() {
    console.log('this.searchForm', this.searchForm);

    if (this.searchForm.valid) {
      Object.assign(this.searchInput, this.searchForm.value);
      console.log('this.searchInput', this.searchInput);
      this.authorService.searchAsync(this.searchInput).subscribe(result => {
        this.authorList = result;
      });
    }
    else {
      alert('forms is in valid');
    }
  }


  createSearchForm() {
    this.searchForm = new FormGroup({
      QueryText: new FormControl()
    });
  }

  removeFilter() {
    this.refreshList();
    this.searchForm.reset();
  }

  clearField(field: string) {
    this.searchForm.get(field).setValue(null);
    this.search();
  }
}

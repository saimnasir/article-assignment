import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/services/author.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Author } from 'src/app/models/author.model';
import { SearchInputBase } from 'src/app/models/inputs/search-input-base.model';
import { MatDialogConfig, MatDialog, DialogPosition } from '@angular/material';
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
  searchInput = new SearchInputBase('');
  position: DialogPosition;
  
  filterPanelOpenState = false;

  constructor(
    public authorService: AuthorService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.minWidth = '80%';
    dialogConfig.minHeight = '80%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;

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

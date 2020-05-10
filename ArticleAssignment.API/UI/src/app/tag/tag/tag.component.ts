import { Component, OnInit, Input } from '@angular/core';
import { Tag } from 'src/app/models/tag.model';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  constructor(private tagService: TagService) { }

  @Input() tag: Tag;
  @Input() editMode = false;
  showForm = false;
  showActions = false;
  deleteMode = false;
  ngOnInit(): void {
  }

  toggleShowForm() {
    this.showForm = !this.showForm;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }


  toggleShowActions() {
    this.showActions = !this.showActions;
  }

  toggleDeleteMode() {
    this.deleteMode = !this.deleteMode;
  }

  update() {
    this.tagService.update(this.tag).subscribe(result => {
      this.discard();
    });
  }

  delete() {
    this.tagService.delete(this.tag.id).subscribe(result => {
      this.discard();
    });
  }

  discard() {
    this.deleteMode = false;
    this.editMode = false;
    this.showActions = false;
    this.showForm = false;
  }
}

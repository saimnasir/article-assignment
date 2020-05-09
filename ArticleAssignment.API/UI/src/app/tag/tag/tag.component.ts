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
  showFrom = false;

  ngOnInit(): void {
  }

  toggleShowForm() {
    this.showFrom = !this.showFrom;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  update() {
    this.tagService.update(this.tag).subscribe(result => {
      this.toggleShowForm();
    });
  }

  delete() {
    alert('ondelete');
    this.tagService.delete(this.tag.id).subscribe(result => {
    });
  }
}

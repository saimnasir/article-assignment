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
  showFrom = false;

  ngOnInit(): void {
  }

  toggleShowTagFrom() {
    this.showFrom = !this.showFrom;
  }

  update() {
    this.tagService.update(this.tag).subscribe(result => {
      console.log('result', result);
      this.toggleShowTagFrom();
    });
  }
}

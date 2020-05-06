import { Component, OnInit, Input } from '@angular/core';
import { Tag } from 'src/app/models/tag.model';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  constructor() { }

  @Input() tag : Tag;
  ngOnInit(): void {    
  }

}

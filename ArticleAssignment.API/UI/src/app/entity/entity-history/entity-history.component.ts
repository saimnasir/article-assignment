import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-entity-history',
  templateUrl: './entity-history.component.html',
  styleUrls: ['./entity-history.component.css']
})
export class EntityHistoryComponent implements OnInit {

  @Input() createDate: Date;
  @Input() updateDate?: Date;
  @Input() createDateCaption: string;
  @Input() updateDateCaption: string;
  constructor() { }

  ngOnInit(): void {
    if (!this.createDateCaption) {
      this.createDateCaption = 'Created';
    }
    if (!this.updateDateCaption) {
      this.updateDateCaption = 'Edited';
    }
  }

  createdTootipText() {
    return `${this.createDateCaption} at ${this.createDate.toString()}`;
  }

  editedTootipText() {
    if (this.updateDate) {
      return `${this.updateDateCaption} at ${this.updateDate.toString()}`;
    } else {
      return '';
    }
  }
}

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
      this.createDateCaption = 'Create';
    }
    if (!this.updateDateCaption) {
      this.updateDateCaption = 'Last Edit';
    }
  }

}

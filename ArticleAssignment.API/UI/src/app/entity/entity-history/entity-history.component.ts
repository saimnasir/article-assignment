import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-entity-history',
  templateUrl: './entity-history.component.html',
  styleUrls: ['./entity-history.component.css']
})
export class EntityHistoryComponent implements OnInit {

  @Input() createDate: Date;
  @Input() updateDate?: Date;
  constructor() { }

  ngOnInit(): void {
  }

}

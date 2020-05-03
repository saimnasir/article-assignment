import { Component, OnInit, Input } from '@angular/core'; 
import { Author } from 'src/app/models/author.model';
import { Comment } from 'src/app/models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor() { }

  @Input() comment : Comment;
  @Input() author : Author;
  ngOnInit(): void {    
  }

}

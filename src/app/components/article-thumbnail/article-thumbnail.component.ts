import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from '../../models/article.model';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-article-thumbnail',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './article-thumbnail.component.html',
  styleUrls: ['./article-thumbnail.component.scss']
})
export class ArticleThumbnailComponent {
  @Input() article!: Article;
  @Output() notifyLike: EventEmitter<boolean> = new EventEmitter<boolean>();

  sendNotification() {
    this.notifyLike.emit(this.article.isLiked);
  }
}

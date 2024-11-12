import { Component } from '@angular/core';
import { ArticleDetailComponent } from '../../components/article-detail/article-detail.component';

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [ ArticleDetailComponent],
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent {
 
}

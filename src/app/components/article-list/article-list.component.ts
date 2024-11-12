import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { Article } from '../../models/article.model';
import { CommonModule } from '@angular/common';
import { ArticleThumbnailComponent } from '../article-thumbnail/article-thumbnail.component';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, ArticleThumbnailComponent, HttpClientModule], // Add HttpClientModule here
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  ARTICLE_URL = 'http://localhost:3000/articles';

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    this.http.get<Article[]>(this.ARTICLE_URL).subscribe((articles: Article[]) => {
      this.articles = articles;
    });
  }

  handleLike(article: Article) {
    article.isLiked = !article.isLiked;
  }
}

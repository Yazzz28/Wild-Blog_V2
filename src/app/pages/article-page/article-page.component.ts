import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Article } from '../../models/article.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);

  articleId!: number;
  article!: Article;

  ARTICLE_URL = 'http://localhost:3000/articles';
  
  getArticleById(id: number) {
    this.http.get<Article>(`${this.ARTICLE_URL}/${id}`).subscribe({
      next: (data) => {
        this.article = data;
      },
      error: (error) => {
        console.error('Error fetching article:', error);
      },
      complete: () => {
        console.log('Article fetch complete');
      }
    });
  }
  
  handleLike() {
    this.article.isLiked = !this.article.isLiked;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.articleId = Number(params.get('id'));
      if (this.articleId) {
        this.getArticleById(this.articleId);
      }
    });
  }
}

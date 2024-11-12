import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Article } from '../../models/article.model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly apiService = inject(ApiService);

  articleId!: number;
  article!: Article;

  handleLike() {
    this.article.isLiked = !this.article.isLiked;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.articleId = Number(params.get('id'));
      if (this.articleId) {
        this.apiService.getArticleById(this.articleId).subscribe({
          next: (article) => {
            this.article = article;
          },
          error: (error) => {
            console.error('Erreur lors de la récupération de l\'article:', error);
          }
        });
      }
    });
  }
}

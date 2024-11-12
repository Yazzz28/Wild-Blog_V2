import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Article } from '../../models/article.model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss'
})
export class ArticleDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly apiService = inject(ApiService);

  articleId!: number;
  article$!: Article;

  handleLike() {
    this.article$.isLiked = !this.article$.isLiked;
    this.apiService.updateArticle$(this.article$).subscribe({
      next: (article) => {
        this.article$ = article;
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de l\'article:', error);
      }
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.articleId = Number(params.get('id'));
      if (this.articleId) {
        this.apiService.getArticleById$(this.articleId).subscribe({
          next: (article) => {
            this.article$ = article;
          },
          error: (error) => {
            console.error('Erreur lors de la récupération de l\'article:', error);
          }
        });
      }
    });
  }
}

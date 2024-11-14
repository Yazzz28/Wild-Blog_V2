import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Article } from '../../models/article.model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss'
})
export class ArticleDetailComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly apiService = inject(ApiService);
  private readonly destroy$ = new Subject<void>();

  articleId!: number;
  article$!: Article;

  handleLike() {
    this.article$.isLiked = !this.article$.isLiked;
    this.apiService.updateArticle$(this.article$).pipe(takeUntil(this.destroy$)).subscribe({
      next: (article) => {
        this.article$ = article;
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de l\'article:', error);
      }
    });
  }

  ngOnInit() {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params: ParamMap) => {
      this.articleId = Number(params.get('id'));
      if (this.articleId) {
        this.apiService.getArticleById$(this.articleId).pipe(takeUntil(this.destroy$)).subscribe({
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

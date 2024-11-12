import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Article } from '../../models/article.model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly apiService = inject(ApiService);

  private readonly articleSubject = new BehaviorSubject<Article | null>(null);
  article$: Observable<Article | null> = this.articleSubject.asObservable();

  articleId!: number;

  handleLike() {
    const article = this.articleSubject.value;
    if (article) {
      article.isLiked = !article.isLiked;
      this.apiService.updateArticle$(article).pipe(
        switchMap((updatedArticle) => {
          return this.apiService.getArticleById$(updatedArticle.id);
        })
      ).subscribe({
        next: (updatedArticle) => {
          this.articleSubject.next(updatedArticle);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de l\'article:', error);
        }
      });
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.articleId = Number(params.get('id'));
      if (this.articleId) {
        this.apiService.getArticleById$(this.articleId).subscribe({
          next: (article) => {
            this.articleSubject.next(article);
          },
          error: (error) => {
            console.error('Erreur lors de la récupération de l\'article:', error);
          }
        });
      }
    });
  }
}

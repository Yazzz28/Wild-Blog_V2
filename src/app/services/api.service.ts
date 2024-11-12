import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  articles: Article[] = [];
  private readonly apiUrl = 'http://localhost:3000/articles';

  // Injection de HttpClient via le constructeur
  constructor(private readonly http: HttpClient) {}

  public getArticles$(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl).pipe(
      map((articles) => {
        this.articles = articles;
        return articles;
      })
    );
  }

  public getArticleById$(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }

  public updateArticle$(article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/${article.id}`, article);
  }
}

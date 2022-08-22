import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  URL = "http://127.0.0.1:5000/categories"
  constructor(private http: HttpClient) { }

  /** GET Categories from the server */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.URL)
  }

  /** GET Category by id. Will 404 if id not found */
  getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.URL}/${id}`)
  }


  /** GET Category by id. Will 404 if id not found */
  delCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(`${this.URL}/${id}`)
  }

  /** create a  Category  */
  addCategory(category: Category): Observable<any> {
    return this.http.post<any>(`${this.URL}`, {"categoryName": category.categoryName})
  }
}
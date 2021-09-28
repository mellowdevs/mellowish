import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from 'ngx-webstorage';
import {CategoryModel} from './CategoryModel';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get<CategoryModel[]>(`${environment.url}/category`);
  }
  getCategory(id: string) {
    return this.http.get<CategoryModel>(`${environment.url}/category/${id}`);
  }
  saveCategory(categoryModel: CategoryModel) {
    return this.http.post<CategoryModel>(`${environment.url}/category`, categoryModel);
  }
  updateCategory(categoryModel: CategoryModel) {
    return this.http.put<CategoryModel>(`${environment.url}/category`, categoryModel);
  }
  deleteCategory(id: string) {
    return this.http.delete<CategoryModel[]>(`${environment.url}/category/${id}`);
  }
  deleteAllCategories() {
    return this.http.delete(`${environment.url}/category/all`);
  }



}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {WishModel} from "./WishModel";
import {CategoryModel} from "../category/CategoryModel";

@Injectable({
  providedIn: 'root'
})
export class WishService {

  constructor(private http: HttpClient) { }

  getWish (id:string, catId: string) {
    return this.http.get<WishModel>(`${environment.url}/category/${catId}/wish/${id}`);
  }
  saveWish(catId: string, wish: WishModel){
    return this.http.post<WishModel>(`${environment.url}/category/${catId}/wish`, wish);
  }
  updateWish(catId: string, wish: WishModel){
    return this.http.put<WishModel>(`${environment.url}/category/${catId}/wish`, wish);
  }
  deleteWish(id: string, catId: string) {
    return this.http.delete<CategoryModel>(`${environment.url}/category/${catId}/wish/${id}`);
  }

  changeWishCategory(wishId: string, prevId: string, nextId: string, nextIndex: number) {
    return this.http.put<CategoryModel[]>(`${environment.url}/category/${prevId}/wish/${wishId}/change`, {nextId, nextIndex});
  }

  getAllGrantedWishes() {
    return this.http.get<WishModel[]>(`${environment.url}/granted`);
  }

  grantWish( wish: WishModel) {
    return this.http.put<WishModel[]>(`${environment.url}/granted`, wish);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserModel} from "./UserModel";

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http: HttpClient) {}
  getUserBudget() {
    return this.http.get(`${environment.url}/budget`);
  }
  updateUserBudget(newBudget: number) {
    return this.http.put(`${environment.url}/budget`, newBudget);
  }
}

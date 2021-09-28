import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CategoryService} from "../category/category.service";
import {BudgetService} from "./budget.service";
import {UserModel} from "./UserModel";

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  modalForm: FormGroup;
  total: number;
  budget: number;
  modalData: any;
  user: UserModel;
  pricesByCategory = [];
  pricesByCategoryLabels = [];
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private categoryService: CategoryService,private budgetService: BudgetService) {

  }

  ngOnInit(): void {
    this.total = 0;
    this.budgetService.getUserBudget().toPromise().then(res => {
    this.modalData.budget = res;
    this.budget = this.modalData.budget.toFixed(2);
  });
    this.categoryService.getAllCategories().toPromise().then(all => {
      for (let category of all) {
        this.pricesByCategory.push(category.total);
        this.pricesByCategoryLabels.push(category.name);
        this.total += category.total;
      }
    });
    this.modalForm = this.formBuilder.group({
      amount: new FormControl(null)
    })
  }

  updateUser(isIncrease: boolean){
    const amount = this.modalForm.controls.amount.value;
    this.modalData.budget += isIncrease ?  amount: -amount;
    const {_id, password, email, username} = this.modalData;
    this.user = new UserModel(_id,username, email, password, this.modalData.budget);
    this.budgetService.updateUserBudget(this.modalData.budget).toPromise().then(res=> {
      this.modalData.budget = res;
      this.budget = this.modalData.budget.toFixed(2);
      this.pricesByCategory = [this.total, this.budget];
      this.modalForm.controls.amount.setValue(null);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryModel} from "../CategoryModel";
import {CategoryService} from "../category.service";
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  modalData: any;
  modalForm: FormGroup;
  category: CategoryModel;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.modalForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
    });
    if (this.modalData._id){
      this.modalForm.setValue({name: this.modalData.name});
    }
  }

  onSubmit() {
    this.modalData.name = this.modalForm.controls.name.value;
    this.category = new CategoryModel(this.modalData._id, this.modalData.name, this.modalData.total, this.modalData.wishDtos);
    if (this.category._id) {
      this.categoryService.updateCategory(this.category).toPromise().then(res => {
        this.modalData = res;
        this.activeModal.close();
      });
    } else {
      this.categoryService.saveCategory(this.category).subscribe(res => {
        this.modalData = res;
        this.activeModal.close();
        window.location.reload();
      });
    }

  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.modalData._id).toPromise().then(res => {
      this.modalData = res;
      this.activeModal.close();
      window.location.reload();
    })

  }
}

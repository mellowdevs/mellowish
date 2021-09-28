import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../category/category.service';
import {CategoryModel} from '../category/CategoryModel';
import {ModalService} from "../shared/modal.service";
import {CategoryComponent} from "../category/category/category.component";
import {WishComponent} from "../wish/wish/wish.component";
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {WishService} from "../wish/wish.service";
import {WishModel} from "../wish/WishModel";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  categoryList: CategoryModel[];
  public categoryModal = CategoryComponent;
  public wishModal = WishComponent;
  grantedWishes: WishModel[];
  public editMode: boolean = false;
  public selectedCategoryId: string;
  public modalForm: FormGroup;
  constructor(private categoryService: CategoryService,
              private formBuilder: FormBuilder,
              private wishService: WishService,
              public modalService: ModalService) {
    this.getAllCategories();
    this.wishService.getAllGrantedWishes().toPromise().then(res => {
      this.grantedWishes = res;
    })

  }

  async getAllCategories() {
    this.categoryService.getAllCategories().toPromise().then(res => {
      this.categoryList = res;
    });
  }

  ngOnInit(): void {
    this.modalForm = this.formBuilder.group({
      categoryName: new FormControl('')
    })
  }

  async drop($event: CdkDragDrop<CategoryModel>) {
      const data = $event.item.data;
      if (data.granted){
        const newCategoryId = $event.container.data._id;
        if (newCategoryId != $event.item.data){
          const wish = new WishModel(data._id,newCategoryId, data.title, data.detail, data.price, data.urls, data.imageUrls,false);
          this.wishService.changeWishCategory(data._id, data.categoryId, newCategoryId, $event.currentIndex).subscribe(result=> {
            this.wishService.grantWish(wish).toPromise().then(res => {
              this.grantedWishes = res;
              this.getAllCategories().then();
            });
          });
        } else {
          const wish = new WishModel(data._id, data.categoryId, data.title, data.detail, data.price, data.urls, data.imageUrls,false);
          this.wishService.grantWish(wish).toPromise().then(res => {
            this.grantedWishes = res;
            this.getAllCategories().then();
          });
        }

      } else {
        const nextIndex = $event.currentIndex;
        const prevId = $event.previousContainer.data._id;
        const nextId = $event.container.data._id;
        const wishId = $event.item.data._id;
        this.wishService.changeWishCategory(wishId, prevId, nextId, nextIndex).toPromise().then(res => {
          this.categoryList = res;
        });
      }
  }

  async grantWish($event: CdkDragDrop<WishModel[], any>) {
    const data = $event.item.data;
    const wish = new WishModel(data._id, data.categoryId, data.title, data.detail, data.price, data.urls, data.imageUrls,true);
        this.wishService.grantWish(wish).toPromise().then(res => {
      this.grantedWishes = res;
      this.getAllCategories().then();
    });
  }

  setEditMode(id?: string, name?: string) {
    this.editMode = true;
    if (id) {
      this.selectedCategoryId = id;
      this.modalForm.controls.categoryName.setValue(name)
    }
  }

  saveCategoryName(id?: string) {
    const categoryName = this.modalForm.controls.categoryName.value;
    if (!id) {
      let category = new CategoryModel(null, categoryName);
      this.categoryService.saveCategory(category).subscribe(res => {
        this.getAllCategories();
      });
    } else {
      this.categoryService.getCategory(id).subscribe(category => {
        category.name = categoryName;
        this.categoryService.updateCategory(category).toPromise().then(res =>{
          this.getAllCategories();
        });
      });
    }
    this.editMode = false;
    this.selectedCategoryId = undefined;
    this.modalForm.controls.categoryName.setValue('');
  }

  cancelChangeName() {
    this.editMode = false;
    this.selectedCategoryId = undefined;
    this.modalForm.controls.categoryName.setValue('');
  }

  deleteCategory() {
    if (this.selectedCategoryId) {
      if (confirm('Are you sure you want to delete this category?')) {
        this.categoryService.deleteCategory(this.selectedCategoryId).toPromise().then(res => {
          this.categoryList = res;
          this.selectedCategoryId = undefined;
        })
      }
    }
  }
}

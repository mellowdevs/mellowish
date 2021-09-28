import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../category/category.service";
import {WishService} from "../wish.service";
import {UrlModel, WishModel} from "../WishModel";
import {Utils} from "tslint";

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.scss']
})
export class WishComponent implements OnInit {
  modalData: any;
  modalForm: FormGroup;
  urls: UrlModel[];
  imageUrls: string[];
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private wishService: WishService) { }

  ngOnInit(): void {
    this.urls = [];
    this.imageUrls = [];
    this.modalForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      detail: new FormControl(''),
      price: new FormControl(''),
      urlTitle: new FormControl(''),
      urlValue: new FormControl(''),
      imageUrl: new FormControl([])
    });
    if (this.modalData._id){
      this.urls = this.modalData.urls;
      this.imageUrls = this.modalData.imageUrls;
      this.modalForm.setValue({
        title: this.modalData.title,
        detail: this.modalData.detail,
        price: this.modalData.price,
        urlTitle: '',
        urlValue: '',
        imageUrl: ''
      });
    }

  }
  onSubmit() {
    const wish = new WishModel(
      this.modalData._id,
      this.modalData.categoryId,
      this.modalForm.controls.title.value,
      this.modalForm.controls.detail.value,
      this.modalForm.controls.price.value,
      this.urls,
      this.imageUrls,
    );
    if(this.modalData._id) {
      this.wishService.updateWish(wish.categoryId, wish).toPromise().then(res => {
        this.modalData = res;
        this.activeModal.close();
        window.location.reload();
      });
    } else {
      this.wishService.saveWish(wish.categoryId, wish).toPromise().then(res => {
        this.modalData = res;
        this.activeModal.close();
        window.location.reload();
      });
    }

  }
  deleteWish() {
    this.wishService.deleteWish(this.modalData._id, this.modalData.categoryId).toPromise().then(res => {
      this.modalData = res;
      this.activeModal.close();
      window.location.reload();
    })

  }

  addUrl() {
    const title = this.modalForm.controls.urlTitle.value;
    let value = this.modalForm.controls.urlValue.value.toString();
    if(title.length > 0 && value.length > 0){
      if(!value.includes('http')){
        value = '//' + value;
      }
      this.urls.push(new UrlModel(title, value));
      this.modalForm.controls.urlTitle.setValue('');
      this.modalForm.controls.urlValue.setValue('');
    }

  }

  removeUrl(i: number) {
    this.urls = this.urls.slice(0,i).concat(this.urls.slice(i + 1, this.urls.length));
  }

  addImageUrl() {
    const image = this.modalForm.controls.imageUrl.value.toString();
    if (image.length > 0) {
      this.imageUrls.push(image);
      this.modalForm.controls.imageUrl.setValue('');
    }
  }

  removeImage(i: any) {
    this.imageUrls = this.imageUrls.slice(0,i).concat(this.imageUrls.slice(i + 1, this.imageUrls.length));
  }
}

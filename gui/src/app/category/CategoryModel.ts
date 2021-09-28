import {WishModel} from '../wish/WishModel';

export class CategoryModel {
  public name: string;
  public wishDtos: WishModel[];
  public _id: string = '';
  total: number = 0;

  constructor(_id: string, name: string, total?: number, wishDtos?: WishModel[]) {
    this._id = _id ? _id : '';
    this.name = name;
    this.wishDtos = wishDtos;
    this.total = total;
  }
}

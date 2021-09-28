class WishModel{
  public _id: string;
  public categoryId: string;
  public title: string;
  public detail: string;
  public price: number;
  public urls: UrlModel[];
  public imageUrls: string[];
  public granted: boolean = false;


  constructor(_id: string, categoryId: string, title: string, detail?: string, price?: number, urls?: UrlModel[], imageUrls?: string[], granted?: boolean) {
    this._id = _id ? _id : null;
    this.categoryId = categoryId;
    this.title = title;
    this.detail = detail;
    this.price = price;
    this.urls = urls;
    this.imageUrls = imageUrls;
    this.granted = granted;
  }
}

class UrlModel {
  title: string
  value: string;

  constructor(title: string, value: string) {
    this.title = title;
    this.value = value;
  }
}

export {WishModel, UrlModel}

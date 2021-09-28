export class UserModel{
  public _id: string;
  public username: string;
  public email: string;
  public password: string;
  public budget: number;

  constructor(_id: string, username: string, email: string, password: string, budget: number) {
    this._id = _id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.budget = budget;
  }
}

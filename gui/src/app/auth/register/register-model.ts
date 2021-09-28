export class RegisterModel {
  public username = '';
  public email = '';
  public password = '';
  public confirmPassword = '';

  constructor(username: string, email: string, password: string, confirmPassword: string) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }

}

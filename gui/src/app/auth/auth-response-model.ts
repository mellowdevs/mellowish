export class AuthResponseModel {
  public authToken: string;
  public username: string;
  public success: boolean;
  public message: string;


  constructor(authToken: string, username: string, success: boolean, message: string) {
    this.authToken = authToken;
    this.username = username;
    this.success = success;
    this.message = message;
  }
}

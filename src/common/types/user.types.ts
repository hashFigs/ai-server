export interface IUser {
    id: string;
    email: string;
    username: string;
    password: string;
  }
  
  export interface IUserLogin {
    email: string;
    password: string;

  }
  
  export interface IUserRegister {
    username: string;
    email: string;
    password: string;
  }
  
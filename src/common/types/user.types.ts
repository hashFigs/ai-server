export interface IUser {
    id: string;
    email: string;
    name: string;
    password: string;
  }
  
  export interface IUserLogin {
    email: string;
    password: string;
  }
  
  export interface IUserRegister {
    name: string;
    email: string;
    password: string;
  }
  
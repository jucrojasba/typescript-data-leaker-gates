import { RequestAuth, ResponseAuth } from "../models/user.model";

export class UserController {
  constructor(
    private endpointLogin?: string,
    private endpointRegister?: string
  ) {}

  //Controller Loguin Request Auth
  async postLogin(data: RequestAuth): Promise<ResponseAuth> {
    const domain: string = "https://api-posts.codificando.xyz";
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const reqOptions: RequestInit = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };
    const url = domain + this.endpointLogin;
    const result: Response = await fetch(url, reqOptions);
    if (result.status===201) {
      const responseBodyLogin: ResponseAuth = await result.json();
      if(responseBodyLogin.message==='Login successful') {
      return responseBodyLogin;
      }else{
        throw new Error(responseBodyLogin.message);
      }
    } else {
      throw new Error(`Login Error ${result.status}`);
    }
  }

  //Controler Register Request Auth
  async postRegister(data: RequestAuth): Promise<ResponseAuth> {
    const domain: string = "https://api-posts.codificando.xyz";
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const reqOptions: RequestInit = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };
    const url = domain + this.endpointRegister;
    const result: Response = await fetch(url, reqOptions);
    if (result.status===201) {
      const responseBodyRegister: ResponseAuth = await result.json();
      return responseBodyRegister;
    }else if(result.status===500){
      throw new Error(`Resgistration Error ${result.status}, probably email was registered before`);
    } else {
      throw new Error(`Registration Error ${result.status}`);
    }
  }


  //Controller Logout
  async postLogout(): Promise<ResponseAuth> {
    const domain: string = "https://api-posts.codificando.xyz";
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const reqOptions: RequestInit = {
      method: "POST",
      headers: headers,
    };
    const url = domain + '/auth/logout';
    const result: Response = await fetch(url, reqOptions);
    if (result.status===201) {
      const responseBodyLogin: ResponseAuth = await result.json();
      if(responseBodyLogin.message==='Logout successful') {
        sessionStorage.clear();
        window.location.reload();
      return responseBodyLogin;
      }else{
        throw new Error(responseBodyLogin.message);
      }
    } else {
      throw new Error(`Logout Error ${result.status}`);
    }
  }
}

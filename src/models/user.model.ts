export interface RequestAuth {
  email: string;
  password: string;
}
export interface ResponseAuth {
  message:string,
  statusCode?:number,
  id?:number,
  email?:string
}

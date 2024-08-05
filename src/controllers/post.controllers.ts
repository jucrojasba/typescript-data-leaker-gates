import { RequestCreatePost, ResponseGetPosts, ResponseCreatePost, CreateCity, ResponseWeather, RequestUpdatePost, ResponseDeletePosts } from '../models/post.model';

export class PostController{
    
    //Create Post
    async createPost(data: RequestCreatePost): Promise<ResponseCreatePost> {
        const userLogedEmail = sessionStorage.getItem('x-user-email');
        const domain:string='https://api-posts.codificando.xyz/posts/';
        const headers:Record<string,string>={
            'Content-Type': 'application/json',
            "x-user-email":`${userLogedEmail}`,
        }
        const reqOptions:RequestInit={
            method: 'POST',
            headers:headers,
            body: JSON.stringify(data)
        }
        const url = domain;
        const result:Response = await fetch(url,reqOptions);
        const responseBody:ResponseCreatePost=await result.json();
        
        if(result.status === 201){
            return responseBody as ResponseCreatePost
        }else{
            console.error(`Response body: ${result.status}`);
            throw new Error(`Response body: ${result.status}`);
        }
    }


    //Get Posts
    async getPosts(): Promise<Array<ResponseGetPosts>> {
        //Data to show post by user Id
        const userIds = JSON.parse(localStorage.getItem('userIds') || '[]');
        const userLogedEmail = sessionStorage.getItem('x-user-email');
        const userLogedId = userIds.find((user:{email:string}) => user.email === userLogedEmail);
        const domain: string = "https://api-posts.codificando.xyz/posts/by-creator/";
        const params:string =`${userLogedId.id}`
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          "x-user-email":`${userLogedEmail}`,
        };
        const reqOptions: RequestInit = {
          method: "GET",
          headers: headers,
        };
        const url = domain + params;
        const result: Response = await fetch(url, reqOptions);
        if (result.status===200) {
          const responseBodyPosts: Array<ResponseGetPosts> = await result.json();
          return responseBodyPosts;
        }else if(result.status===500){
          throw new Error(`Get Post Error ${result.status}`);
        } else {
          throw new Error(`Get Post Error ${result.status}`);
        }
    }

    // Delete Post
    async deletePost(id:string): Promise<ResponseDeletePosts> {
        //Data to show post by user Id
        const userLogedEmail = sessionStorage.getItem('x-user-email');
        const domain: string = "https://api-posts.codificando.xyz/posts/";
        const params:string =`${id}`
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          "x-user-email":`${userLogedEmail}`,
        };
        const reqOptions: RequestInit = {
          method: "DELETE",
          headers: headers,
        };
        const url = domain + params;
        const result: Response = await fetch(url, reqOptions);
        if (result.status===200) {
          const responseBodyPosts: ResponseDeletePosts = await result.json();
          return responseBodyPosts;
        } else {
          throw new Error(`Delete Error ${result.status}`);
        }
    }

    // Update City
    async updatePost(id:string,data: RequestUpdatePost): Promise<ResponseCreatePost> {
        const userLogedEmail = sessionStorage.getItem('x-user-email');
        const domain:string='https://api-posts.codificando.xyz/posts/';
        const param:string =`${id}`
        const headers:Record<string,string>={
            'Content-Type': 'application/json',
            "x-user-email":`${userLogedEmail}`,
        }
        const reqOptions:RequestInit={
            method: 'PUT',
            headers:headers,
            body: JSON.stringify(data)
        }
        const url = domain+param;
        const result:Response = await fetch(url,reqOptions);
        const responseBody:ResponseCreatePost=await result.json();
        
        if(result.status === 200){
            return responseBody as ResponseCreatePost
        }else{
            console.error(`Response body: ${result.status}`);
            throw new Error(`Response body: ${result.status}`);
        }
    }

    //Color Progress
    colorProgress(progress:number):string{
        if (progress <= 95) {
            return 'rgb(163, 16, 16)';
        } else {
            return 'rgb(109, 219, 18)';
        }
    }


}
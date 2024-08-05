import { ResponseSpelling } from "../models/spelling";

export class SpellingController{
    async errors(data:string):Promise<number>{
        const domain:string='https://api.languagetoolplus.com/v2/check';
        const param = `?text=${data}&language=es`
        const headers:Record<string,string>={
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        const reqOptions:RequestInit={
            method: 'POST',
            headers: headers
        }
        const result:Response=await fetch(domain+param,reqOptions);
        if(result.ok){
            const responseBody:ResponseSpelling=await result.json();
            const errors:number = responseBody.matches.length;
            return errors
        }else{
            throw new Error(`Error to validate text ${result.status}`);
        }
    }
}
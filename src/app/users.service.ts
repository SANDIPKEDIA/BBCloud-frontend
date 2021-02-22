import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }



  getData()
  {
   
    let url="//localhost:4000/api/v1/getallprototype"
    return this.http.get(url);
 
  }
  savePrototype(body)
  {
   
    let url="//localhost:4000/api/v1/createprototype"
    return this.http.post(url,body);
 
  }


}

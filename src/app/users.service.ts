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

  deletePrototype(id)
  {
    let url="//localhost:4000/api/v1/deleteprototype/"+id
    return this.http.delete(url);
  }

  editPrototype(body,id)
  {
    let url="//localhost:4000/api/v1/editprototype/"+id
    return this.http.put(url,body);
  }
  getCus()
  {
    let url="//localhost:4000/api/v1/getallcusmanage"
    return this.http.get(url);
  }

  saveCustomer(body)
  {
    let url="//localhost:4000/api/v1/createcusmanage"
    return this.http.post(url,body);
  }

  deleteCustomer(id)
  {
    let url="//localhost:4000/api/v1/deletecusmanage/"+id
    return this.http.delete(url);
  }

  editCustomer(body,id)
  {
    let url="//localhost:4000/api/v1/editcusmanage/"+id
    return this.http.put(url,body);
  }

  //employee
  getEmp()
  {
    let url="//localhost:4000/api/v1/GetallEmpDetails"
    return this.http.get(url);
  }

  saveEmployee(body)
  {
    let url="//localhost:4000/api/v1/CreateEmp"
    return this.http.post(url,body);
  }

  deleteEmployee(id)
  {
    let url="//localhost:4000/api/v1/deleteemp/"+id
    return this.http.delete(url);
  }

  editEmployee(body,id)
  {
    let url="//localhost:4000/api/v1/empupdate/"+id
    return this.http.put(url,body);
  }

  //task

  getTaskM()
  {
    let url="//localhost:4000/api/v1/getalltaskmanagement"
    return this.http.get(url);
  }

  saveTask(body)
  {
    let url="//localhost:4000/api/v1/createtaskmanagement"
    return this.http.post(url,body);
  }

  deleteTask(id)
  {
    let url="//localhost:4000/api/v1/deletetaskmanagement/"+id
    return this.http.delete(url);
  }

  editTask(body,id)
  {
    let url="//localhost:4000/api/v1/edittaskmanagement/"+id
    return this.http.put(url,body);
  }

//dept


getDept()
{
  let url="//localhost:4000/api/v1/getalldept"
  return this.http.get(url);
}

saveDept(body)
{
  let url="//localhost:4000/api/v1/createdept"
  return this.http.post(url,body);
}

deleteDept(id)
{
  let url="//localhost:4000/api/v1/deletedept/"+id
  return this.http.delete(url);
}

editDept(body,id)
{
  let url="//localhost:4000/api/v1/editdept/"+id
  return this.http.put(url,body);
}

//feedback

getFeed()
{
  let url="//localhost:4000/api/v1/getallfeedmanage"
  return this.http.get(url);
}

saveFeed(body)
{
  let url="//localhost:4000/api/v1/createfeedmanage"
  return this.http.post(url,body);
}

deleteFeed(id)
{
  let url="//localhost:4000/api/v1/deletefeedmanage/"+id
  return this.http.delete(url);
}

editFeed(body,id)
{
  let url="//localhost:4000/api/v1/editfeedmanage/"+id
  return this.http.put(url,body);
}
//customertouchpoint

getCusT()
{
  let url="//localhost:4000/api/v1/getallcus"
  return this.http.get(url);
}

saveCus(body)
{
  let url="//localhost:4000/api/v1/CreateCus"
  return this.http.post(url,body);
}

deleteCus(id)
{
  let url="//localhost:4000/api/v1/deletecus/"+id
  return this.http.delete(url);
}

editCus(body,id)
{
  let url="//localhost:4000/api/v1/editcus/"+id
  return this.http.put(url,body);
}


//organisation



getOrg()
{
  let url="//localhost:4000/api/v1/getallorg"
  return this.http.get(url);
}

saveOrg(body)
{
  let url="//localhost:4000/api/v1/createorg"
  return this.http.post(url,body);
}

deleteOrg(id)
{
  let url="//localhost:4000/api/v1/deleteorg/"+id
  return this.http.delete(url);
}

editOrg(body,id)
{
  let url="//localhost:4000/api/v1/editorg/"+id
  return this.http.put(url,body);
}


}

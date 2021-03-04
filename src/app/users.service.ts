import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public baseUrl=''
  constructor(private http:HttpClient) { 
    this.baseUrl = environment.baseUrl;
  }

  getData()
  {
    let url=this.baseUrl + "/api/v1/getallprototype"
    return this.http.get(url);
  }

  savePrototype(body)
  {
    let url=this.baseUrl + "/api/v1/createprototype"
    return this.http.post(url,body);
  }

  deletePrototype(id)
  {
    let url=this.baseUrl + "/api/v1/deleteprototype/"+id
    return this.http.delete(url);
  }

  editPrototype(body,id)
  {
    let url=this.baseUrl + "/api/v1/editprototype/"+id
    return this.http.put(url,body);
  }
  getCus()
  {
    let url=this.baseUrl + "/api/v1/getallcusmanage"
    return this.http.get(url);
  }

  saveCustomer(body)
  {
    let url=this.baseUrl + "/api/v1/createcusmanage"
    return this.http.post(url,body);
  }

  getCusDetails(id)
  {
    let url=this.baseUrl + `/api/v1/getcusbyid/${id}`
    return this.http.get(url);
  }
  deleteCustomer(id)
  {
    let url=this.baseUrl + "/api/v1/deletecusmanage/"+id
    return this.http.delete(url);
  }

  editCustomer(body,id)
  {
    let url=this.baseUrl + "/api/v1/editcusmanage/"+id
    return this.http.put(url,body);
  }

  //employee
  getEmp()
  {
    let url=this.baseUrl + "/api/v1/GetallEmpDetails"
    return this.http.get(url);
  }


  getEmpDetails(id)
  {
    let url=this.baseUrl + `/api/v1/GetEmpbyid/${id}`
    return this.http.get(url);
  }

  saveEmployee(body)
  {
    let url=this.baseUrl + "/api/v1/CreateEmp"
    return this.http.post(url,body);
  }

  deleteEmployee(id)
  {
    let url=this.baseUrl + "/api/v1/deleteemp/"+id
    return this.http.delete(url);
  }

  editEmployee(body,id)
  {
    let url=this.baseUrl + "/api/v1/empupdate/"+id
    return this.http.put(url,body);
  }

  //task

  getTaskM()
  {
    let url=this.baseUrl + "/api/v1/getalltaskmanagement"
    return this.http.get(url);
  }

  saveTask(body)
  {
    let url=this.baseUrl + "/api/v1/createtaskmanagement"
    return this.http.post(url,body);
  }

  deleteTask(id)
  {
    let url=this.baseUrl + "/api/v1/deletetaskmanagement/"+id
    return this.http.delete(url);
  }

  editTask(body,id)
  {
    let url=this.baseUrl + "/api/v1/edittaskmanagement/"+id
    return this.http.put(url,body);
  }

//dept


getDept()
{
  let url=this.baseUrl + "/api/v1/getalldept"
  return this.http.get(url);
}

saveDept(body)
{
  let url=this.baseUrl + "/api/v1/createdept"
  return this.http.post(url,body);
}

deleteDept(id)
{
  let url=this.baseUrl + "/api/v1/deletedept/"+id
  return this.http.delete(url);
}

editDept(body,id)
{
  let url=this.baseUrl + "/api/v1/editdept/"+id
  return this.http.put(url,body);
}

//feedback

getFeed()
{
  let url=this.baseUrl + "/api/v1/getallfeedmanage"
  return this.http.get(url);
}
getFeedDetails(id)
  {
    let url=this.baseUrl + `/api/v1/getfeedbyid/${id}`
    return this.http.get(url);
  }

saveFeed(body)
{
  let url=this.baseUrl + "/api/v1/createfeedmanage"
  return this.http.post(url,body);
}

deleteFeed(id)
{
  let url=this.baseUrl + "/api/v1/deletefeedmanage/"+id
  return this.http.delete(url);
}

editFeed(body,id)
{
  let url=this.baseUrl + "/api/v1/editfeedmanage/"+id
  return this.http.put(url,body);
}
//customertouchpoint

getCusT()
{
  let url=this.baseUrl + "/api/v1/getallcus"
  return this.http.get(url);
}
getCusTDetails(id)
  {
    let url=this.baseUrl + `/api/v1/GetcustouchpointById/${id}`
    return this.http.get(url);
  }
saveCus(body)
{
  let url=this.baseUrl + "/api/v1/CreateCus"
  return this.http.post(url,body);
}

deleteCus(id)
{
  let url=this.baseUrl + "/api/v1/deletecus/"+id
  return this.http.delete(url);
}

editCus(body,id)
{
  let url=this.baseUrl + "/api/v1/editcus/"+id
  return this.http.put(url,body);
}


//organisation



getOrg()
{
  let url=this.baseUrl + "/api/v1/getallorg"
  return this.http.get(url);
}

saveOrg(body)
{
  let url=this.baseUrl + "/api/v1/createorg"
  return this.http.post(url,body);
}

deleteOrg(id)
{
  let url=this.baseUrl + "/api/v1/deleteorg/"+id
  return this.http.delete(url);
}

editOrg(body,id)
{
  let url=this.baseUrl + "/api/v1/editorg/"+id
  return this.http.put(url,body);
}

//order


getOrder()
{
  let url=this.baseUrl + "/api/v1/getallorder"
  return this.http.get(url);
}

saveOrder(body)
{
  let url=this.baseUrl + "/api/v1/createOrder"
  return this.http.post(url,body);
}

deleteOrder(id)
{
  let url=this.baseUrl + "/api/v1/deleteorder/"+id
  return this.http.delete(url);
}

editOrder(body,id)
{
  let url=this.baseUrl + "/api/v1/editorder/"+id
  return this.http.put(url,body);
}


//induction


getInduction()
{
  let url=this.baseUrl + "/api/v1/getallInductionManagement"
  return this.http.get(url);
}
getInductionDetails(id)
  {
    let url=this.baseUrl + `/api/v1/getinductionbyid/${id}`
    return this.http.get(url);
  }


saveInduction(body)
{
  let url=this.baseUrl + "/api/v1/createInductionManagement"
  return this.http.post(url,body);
}

deleteInduction(id)
{
  let url=this.baseUrl + "/api/v1/deleteInductionManagement/"+id
  return this.http.delete(url);
}

editInduction(body,id)
{
  let url=this.baseUrl + "/api/v1/editPlanManagement/"+id
  return this.http.put(url,body);
}

//plan

getPlan()
{
  let url=this.baseUrl + "/api/v1/getallPlanManagement"
  return this.http.get(url);
}

savePlan(body)
{
  let url=this.baseUrl + "/api/v1/createPlanManagement"
  return this.http.post(url,body);
}

deletePlan(id)
{
  let url=this.baseUrl + "/api/v1/deletePlanManagement/"+id
  return this.http.delete(url);
}

editPlan(body,id)
{
  let url=this.baseUrl + "/api/v1/editPlanManagement/"+id
  return this.http.put(url,body);
}
//marketing


getMarketing()
{
  let url=this.baseUrl + "/api/v1/getallMarketingManagement"
  return this.http.get(url);
}

saveMarketing(body)
{
  let url=this.baseUrl + "/api/v1/createMarketingManagement"
  return this.http.post(url,body);
}

deleteMarketing(id)
{
  let url=this.baseUrl + "/api/v1/deleteMarketingManagement/"+id
  return this.http.delete(url);
}

editMarketing(body,id)
{
  let url=this.baseUrl + "/api/v1/editMarketingManagement/"+id
  return this.http.put(url,body);
}

//git

getGit()
{
  let url=this.baseUrl + "/api/v1/getallgitmanage"
  return this.http.get(url);
}
getGitDetails(id)
  {
    let url=this.baseUrl + `/api/v1/getgitbyid/${id}`
    return this.http.get(url);
  }

saveGit(body)
{
  let url=this.baseUrl + "/api/v1/creategitmanage"
  return this.http.post(url,body);
}

deleteGit(id)
{
  let url=this.baseUrl + "/api/v1/deletegitManage/"+id
  return this.http.delete(url);
}

editGit(body,id)
{
  let url=this.baseUrl + "/api/v1/editgitManage/"+id
  return this.http.put(url,body);
}


//project



getProject()
{
  let url=this.baseUrl + "/api/v1/getallProjectManage"
  return this.http.get(url);
}

saveProject(body)
{  let url=this.baseUrl + "/api/v1/createProjectManage"
  return this.http.post(url,body);
}

deleteProject(id)
{
  let url=this.baseUrl + "/api/v1/deleteProjectmanage/"+id
  return this.http.delete(url);
}

editProject(body,id)
{
  let url=this.baseUrl + "/api/v1/editProjectmanage/"+id
  return this.http.put(url,body);
}


//vacancy


getVacancy()
{
  let url=this.baseUrl + "/api/v1/getallVacancyManagement"
  return this.http.get(url);
}

saveVacancy(body)
{  let url=this.baseUrl + "/api/v1/createVacancyManagement"
  return this.http.post(url,body);
}

deleteVacancy(id)
{
  let url=this.baseUrl + "/api/v1/deleteVacancymanagement/"+id
  return this.http.delete(url);
}

editVacancy(body,id)
{
  let url=this.baseUrl + "/api/v1/editVacancymanagement/"+id
  return this.http.put(url,body);
}


//Training

getTraining()
{
  let url=this.baseUrl + "/api/v1/alltraining"
  return this.http.get(url);
}

saveTraining(body)
{  let url=this.baseUrl + "/api/v1/createtraining"
  return this.http.post(url,body);
}

deleteTraining(id)
{
  let url=this.baseUrl + "/api/v1/deletetraining/"+id
  return this.http.delete(url);
}

editTraining(body,id)
{
  let url=this.baseUrl + "/api/v1/edittraining/"+id
  return this.http.put(url,body);
}


//package


getPackage()
{
  let url=this.baseUrl + "/api/v1/GetallPkg"
  return this.http.get(url);
}

savePackage(body)
{  let url=this.baseUrl + "/api/v1/CreatePkg"
  return this.http.post(url,body);
}

deletePackage(id)
{
  let url=this.baseUrl + "/api/v1/deletePkg/"+id
  return this.http.delete(url);
}

editPackage(body,id)
{
  let url=this.baseUrl + "/api/v1/EditPkg/"+id
  return this.http.put(url,body);
}

//knowledge

getKnowledgeCenter()
{
  let url=this.baseUrl + "/api/v1/GetallCenterDetails"
  return this.http.get(url);
}
getknowledgeDetails(id)
  {
    let url=this.baseUrl + `/api/v1/GetCenterById/${id}`
    return this.http.get(url);
  }

saveKnowledgeCenter(body)
{  let url=this.baseUrl + "/api/v1/CreateCenter"
  return this.http.post(url,body);
}

deleteKnowledgeCenter(id)
{
  let url=this.baseUrl + "/api/v1/deletecenter/"+id
  return this.http.delete(url);
}

editKnowledgeCenter(body,id)
{
  let url=this.baseUrl + "/api/v1/editcenter/"+id
  return this.http.put(url,body);
}

//Feature

getFeature()
{
  let url=this.baseUrl + "/api/v1/GetallFeature"
  return this.http.get(url);
}

saveFeature(body)
{  let url=this.baseUrl + "/api/v1/CreateFeature"
  return this.http.post(url,body);
}

deleteFeature(id)
{
  let url=this.baseUrl + "/api/v1/deleteFeature/"+id
  return this.http.delete(url);
}

editFeature(body,id)
{
  let url=this.baseUrl + "/api/v1/editFeature/"+id
  return this.http.put(url,body);
}
//ticket



getTicket()
{
  let url=this.baseUrl + "/api/v1/GetallTicketDetails"
  return this.http.get(url);
}

saveTicket(body)
{  let url=this.baseUrl + "/api/v1/CreateTicket"
  return this.http.post(url,body);
}

deleteTicket(id)
{
  let url=this.baseUrl + "/api/v1/deleteticket/"+id
  return this.http.delete(url);
}

editTicket(body,id)
{
  let url=this.baseUrl + "/api/v1/ticketupdate/"+id
  return this.http.put(url,body);
}

//work

getWork()
{
  let url=this.baseUrl + "/api/v1/getallwork"
  return this.http.get(url);
}

saveWork(body)
{  let url=this.baseUrl + "/api/v1/creatework"
  return this.http.post(url,body);
}

deleteWork(id)
{
  let url=this.baseUrl + "/api/v1/deletework/"+id
  return this.http.delete(url);
}

editWork(body,id)
{
  let url=this.baseUrl + "/api/v1/editwork/"+id
  return this.http.put(url,body);
}

//todo


getTodo()
{
  let url=this.baseUrl + "/api/v1/getalltodo"
  return this.http.get(url);
}

saveTodo(body)
{  let url=this.baseUrl + "/api/v1/Createtodo"
  return this.http.post(url,body);
}

deleteTodo(id)
{
  let url=this.baseUrl + "/api/v1/deletetodo/"+id
  return this.http.delete(url);
}

editTodo(body,id)
{
  let url=this.baseUrl + "/api/v1/edittodo/"+id
  return this.http.put(url,body);
}



//meeting

getMeeting()
{
  let url=this.baseUrl + "/api/v1/getallmeeting"
  return this.http.get(url);
}

saveMeeting(body)
{  let url=this.baseUrl + "/api/v1/createmeeting"
  return this.http.post(url,body);
}

deleteMeeting(id)
{
  let url=this.baseUrl + "/api/v1/deletemeeting/"+id
  return this.http.delete(url);
}

editMeeting(body,id)
{
  let url=this.baseUrl + "/api/v1/editmeeting/"+id
  return this.http.put(url,body);
}



}

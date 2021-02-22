import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  myReactiveForm:FormGroup
  list :any;
  constructor(private user:UsersService) {
    this.user.getData().subscribe(data2=>{
      console.log("Prototype result",data2)
      // this.data=data
    })
   }

  ngOnInit() {
  this.myReactiveForm = new FormGroup({
    'name': new FormControl(null),
    'description': new FormControl(null),
    'catagory': new FormControl(null),
    'designs_count': new FormControl(null)
  })
}
onSubmit(){
  console.log(this.myReactiveForm);
  
  this.user.savePrototype(this.myReactiveForm.value).subscribe(data=>{
  // const objectKeys = Object.keys;
    console.log("Prototype result",data);
    this.list=data;
    
    console.log("this data: ",this.list);
    // console.log(datas);
  }
    
  )} 

  
}





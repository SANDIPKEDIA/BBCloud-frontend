import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ToastController } from "@ionic/angular";
import { UsersService } from "../users.service";
import { AlertController } from '@ionic/angular';
@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit {
  myReactiveForm: FormGroup;
  isShow: boolean =false;
  editUserId;
  formData;
  list: any;
  // public del: string;
  constructor(private user: UsersService,public toastController: ToastController,public alertController: AlertController) {
   
  }

  getProtoype(){
    this.user.getData().subscribe((result) => {
      console.log("Prototype result", result);
      this.list = result["response"];
    });
  }

  ngOnInit() {

    this.getProtoype();

    this.myReactiveForm = new FormGroup({
      name: new FormControl(null),
      description: new FormControl(null),
      catagory: new FormControl(null),
      designs_count: new FormControl(null),
    });
  }

  onSubmit() {
    // if(this.editMode){
    //   this.updatePrototypeManagement(this.formData,this.editUserId)
    // }
    // else{
      this.isShow = false;
    console.log(this.myReactiveForm);  
    this.user.savePrototype(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      this.presentToast('Prototype added')
      this.getProtoype();
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color:'success'
    });
    toast.present();
  }

  deletePrototypeManagement(id){
    if(confirm("Are you sure to delete?")){
    // if(this.presentAlert('Are you sure to delete?')){ 
    this.user.deletePrototype(id).subscribe((data) => {
        this.getProtoype();
        this.presentToast('Prototype Deleted')
        // this.presentAlert('Are you sure to delete?')

    })
    // }
    }}

    // async presentAlert(msg) {
    //   const alert = await this.alertController.create({
    //     cssClass: 'my-custom-class',
    //     header: '',
    //     subHeader: 'Confirmation',
    //     message: msg,
    //     buttons: ['OK']
    //   });
  
    //   await alert.present();
    // }
    editPrototypeManagement(data){
      this.isShow = true;
      this.myReactiveForm.patchValue(data)
    }

    updatePrototypeManagement(body,id){
     
    // this.formData = JSON.parse(JSON.stringify(body.value));
    // console.log("formdatataata:  " ,this.formData);  
    this.user.editPrototype(body.value,id).subscribe((data) => {
    console.log("this id is :",id);
      this.getProtoype();
    })
  }

 




  

  


}

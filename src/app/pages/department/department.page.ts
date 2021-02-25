import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../users.service";
import { AddEditDepartmentPageModel } from "./model/department/add-edit-department.page";

@Component({
  selector: 'app-department',
  templateUrl: './department.page.html',
  styleUrls: ['./department.page.scss'],
})

export class DepartmentPage implements OnInit {

  myReactiveForm: FormGroup;
  isShow: boolean = false;
  editUserId;
  formData;
  list: any;
  // public del: string;
  constructor(
    private user: UsersService,
    public toastController: ToastController,
    public alertController: AlertController,
    public modalController: ModalController,
  ) {}

  getDepartment() {
    this.user.getDept().subscribe((result) => {
      console.log("Department result", result);
      this.list = result["response"];
    });
  }

  ngOnInit() {
    this.getDepartment();
    
    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
    
      

    });
  }

  onSubmit() {
    
    this.isShow = false;
    console.log(this.myReactiveForm);
    this.user.saveDept(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      // this.presentToast("Task added");
      this.getDepartment();
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: "success",
    });
    toast.present();
  }

  deleteDepartment(id) {
      this.user.deleteDept(id).subscribe((data) => {
        this.getDepartment();
        this.presentToast("Department Deleted");
      });
  }

 
  editDepartment(data) {
    this.isShow = true;

    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set 
    this.myReactiveForm.get('id').setValue(data._id);
  }

  updateDepartment(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editDept(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      // this.presentToast("Employee Updated");
      this.getDepartment();   
    });
  }

  async presentAlertConfirm(id) {
    let self = this;
    const alert = await this.alertController.create({
      header: 'Delete Dept',
      message: "Are you sure you want to delete?",
      buttons: [
        {
          text: 'Cancel',

          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Okay',
          handler: () => {
            self.deleteDepartment(id)
          }
        }
      ]
    });

    await alert.present();
  }

  async openAddDepartmentModal() {
    const modal = await this.modalController.create({
      component: AddEditDepartmentPageModel,
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getDepartment();
    });
    return await modal.present();
  }

  async openEditDepartmentModal(body) {
        const modal = await this.modalController.create({
      component: AddEditDepartmentPageModel,
      componentProps:{
        data:body
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getDepartment();
    });
    return await modal.present();
  }

 
  
}

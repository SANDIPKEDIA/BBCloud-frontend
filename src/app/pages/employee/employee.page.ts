import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../users.service";
import { AddEditEmployeePageModel } from "./model/employee/add-edit-employee.page";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})

export class EmployeePage implements OnInit {

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

  getEmployee() {
    this.user.getEmp().subscribe((result) => {
      console.log("Employee result", result);
      this.list = result["response"];
    });
  }

  ngOnInit() {
    this.getEmployee();
    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
      age: new FormControl(''),
      department_id: new FormControl(''),
      position: new FormControl(''),
    });
  }

  onSubmit() {
    
    this.isShow = false;
    console.log(this.myReactiveForm);
    this.user.saveEmployee(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      // this.presentToast("Employee added");
      this.getEmployee();
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

  deleteEmployeeManagement(id) {
      this.user.deleteEmployee(id).subscribe((data) => {
        this.getEmployee();
        this.presentToast("Employee Deleted");
      });
  }

 
  editEmployeeManagement(data) {
    this.isShow = true;

    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set 
    this.myReactiveForm.get('id').setValue(data._id);
  }

  updateEmployeeManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editEmployee(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      // this.presentToast("Employee Updated");
      this.getEmployee();   
    });
  }

  async presentAlertConfirm(id) {
    let self = this;
    const alert = await this.alertController.create({
      header: 'Delete Employee',
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
            self.deleteEmployeeManagement(id)
          }
        }
      ]
    });

    await alert.present();
  }

  async openAddEmployeeModal() {
    const modal = await this.modalController.create({
      component: AddEditEmployeePageModel,
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getEmployee();
    });
    return await modal.present();
  }

  async openEditEmployeeModal(body) {
        const modal = await this.modalController.create({
      component: AddEditEmployeePageModel,
      componentProps:{
        data:body
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getEmployee();
    });
    return await modal.present();
  }
  
}

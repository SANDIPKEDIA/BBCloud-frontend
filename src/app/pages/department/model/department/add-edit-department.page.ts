import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../../../users.service";

@Component({
  selector: "app-add-edit-department",
  templateUrl: "./add-edit-department.page.html",
  styleUrls: ["./add-edit-department.page.scss"],
})
export class AddEditDepartmentPageModel implements OnInit {
  myReactiveForm: FormGroup;
  isShow: boolean = false;
  editUserId;
  formData;
  // public employeeList=[];
  data: any;
  // public del: string;
  constructor(
    private user: UsersService,
    public toastController: ToastController,
    public alertController: AlertController,
    public modalController: ModalController
  ) {}

  async closeModal() {
    const onClosedData: string = "success";
    await this.modalController.dismiss(onClosedData);
  }

  ngOnInit() {
    

    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
    

      

    });

    

    if(this.data){
      this.editDepartment(this.data);
    }
  }
  // getDepartment() {
  //   throw new Error("Method not implemented.");
  // }

  onSubmit() {
    this.isShow = false;
    this.user.saveDept(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      this.presentToast("Department added");
      this.closeModal();
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

  editDepartment(data) {
    this.isShow = true;
    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set
    this.myReactiveForm.get("id").setValue(data._id);
  }

  updateDepartment(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editDept(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      this.closeModal();
      this.presentToast("Department Updated");
    });
  }

  // getEmployee() {
  //   this.user.getEmp().subscribe((result) => {
  //     console.log("Employee result", result);
  //     this.employeeList = result["response"];
  //   });
  // }
}

import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../../../users.service";

@Component({
  selector: "app-add-edit-employee",
  templateUrl: "./add-edit-employee.page.html",
  styleUrls: ["./add-edit-employee.page.scss"],
})
export class AddEditEmployeePageModel implements OnInit {
  myReactiveForm: FormGroup;
  isShow: boolean = false;
  editUserId;
  formData;
  public departmentList=[];
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
    this.getDepartment();
    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
      age: new FormControl(''),
      departmentId: new FormControl(''),
      position: new FormControl(''),
    });

    

    if(this.data){
      this.editEmployeeManagement(this.data);
    }
  }

  onSubmit() {
    this.isShow = false;
    this.user.saveEmployee(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      this.presentToast("Employee added");
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

  editEmployeeManagement(data) {
    this.isShow = true;
    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set
    this.myReactiveForm.get("id").setValue(data._id);
  }

  updateEmployeeManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editEmployee(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      this.closeModal();
      this.presentToast("Employee Updated");
    });
  }
  getDepartment() {
    this.user.getDept().subscribe((result) => {
      console.log("Department result", result);
      this.departmentList = result["response"];
    });
  }
}

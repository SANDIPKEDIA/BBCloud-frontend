import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../../../users.service";

@Component({
  selector: "app-add-edit-induction",
  templateUrl: "./add-edit-induction.page.html",
  styleUrls: ["./add-edit-induction.page.scss"],
})
export class AddEditInductionPageModel implements OnInit {
  myReactiveForm: FormGroup;
  isShow: boolean = false;
  editUserId;
  public employeeList=[];
  formData;
  
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
    this.getEmployee();
    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      emp_name: new FormControl(''),
      empId: new FormControl(''),
      joining_date: new FormControl(''),
      induction_completed_date: new FormControl(''),
      status: new FormControl(''),
     
    });

    

    if(this.data){
      this.editInductionManagement(this.data);
    }
  }

  onSubmit() {
    this.isShow = false;
    this.user.saveInduction(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      this.presentToast("Induction added");
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

  editInductionManagement(data) {
    this.isShow = true;
    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set
    this.myReactiveForm.get("id").setValue(data._id);
  }

  updateInductionManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editInduction(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      this.closeModal();
      this.presentToast("Induction Updated");
    });
  }
  getEmployee() {
    this.user.getEmp().subscribe((result) => {
      console.log("Employee result", result);
      this.employeeList = result["response"];
    });
  }

 
}

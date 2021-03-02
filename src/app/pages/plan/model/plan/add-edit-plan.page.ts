import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../../../users.service";

@Component({
  selector: "app-add-edit-plan",
  templateUrl: "./add-edit-plan.page.html",
  styleUrls: ["./add-edit-plan.page.scss"],
})
export class AddEditPlanPageModel implements OnInit {
  myReactiveForm: FormGroup;
  isShow: boolean = false;
  editUserId;
  // public employeeList=[];
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
    // this.getEmployee();
    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      title: new FormControl(''),
      start_date: new FormControl(''),
      end_date: new FormControl(''),
      description: new FormControl(''),
      comments: new FormControl(''),
     
    });

    

    if(this.data){
      this.editPlanManagement(this.data);
    }
  }

  onSubmit() {
    this.isShow = false;
    this.user.savePlan(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      this.presentToast("Plan added");
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

  editPlanManagement(data) {
    this.isShow = true;
    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set
    this.myReactiveForm.get("id").setValue(data._id);
  }

  updatePlanManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editPlan(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      this.closeModal();
      this.presentToast("Plan Updated");
    });
  }
  // getEmployee() {
  //   this.user.getEmp().subscribe((result) => {
  //     console.log("Employee result", result);
  //     this.employeeList = result["response"];
  //   });
  // }

 
}

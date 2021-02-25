import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../../../users.service";

@Component({
  selector: "app-add-edit-feedback",
  templateUrl: "./add-edit-feedback.page.html",
  styleUrls: ["./add-edit-feedback.page.scss"],
})
export class AddEditFeedbackPageModel implements OnInit {
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
      project: new FormControl(''),
      feedback: new FormControl(''),
      date: new FormControl(''),
      submitted_by: new FormControl(''),
      raise_by: new FormControl(''),
      

    

      

    });

    

    if(this.data){
      this.editFeedback(this.data);
    }
  }
  // getFeedback() {
  //   throw new Error("Method not implemented.");
  // }

  onSubmit() {
    this.isShow = false;
    this.user.saveFeed(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      this.presentToast("feedback added");
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

  editFeedback(data) {
    this.isShow = true;
    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set
    this.myReactiveForm.get("id").setValue(data._id);
  }

  updateFeedback(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editFeed(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      this.closeModal();
      this.presentToast("Feedback Updated");
    });
  }

  // getEmployee() {
  //   this.user.getEmp().subscribe((result) => {
  //     console.log("Employee result", result);
  //     this.employeeList = result["response"];
  //   });
  // }
}

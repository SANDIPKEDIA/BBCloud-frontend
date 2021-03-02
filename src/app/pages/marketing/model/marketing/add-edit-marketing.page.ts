import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../../../users.service";

@Component({
  selector: "app-add-edit-marketing",
  templateUrl: "./add-edit-marketing.page.html",
  styleUrls: ["./add-edit-marketing.page.scss"],
})
export class AddEditMarketingPageModel implements OnInit {
  myReactiveForm: FormGroup;
  isShow: boolean = false;
  isOn: boolean;
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
      advertisement_name: new FormControl(''),
      start_date: new FormControl(''),
      end_date: new FormControl(''),
      description: new FormControl(''),
      platform: new FormControl(''),
      resultfileId: new FormControl(''),
      benifits_comments: new FormControl(''),
      isOnline: new FormControl(this.isOn),
     
    });

    

    if(this.data){
      this.editMarketingManagement(this.data);
    }
  }

  onSubmit() {
    this.isShow = false;
    this.user.saveMarketing(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      this.presentToast("Marketing added");
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

  editMarketingManagement(data) {
    this.isShow = true;
    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set
    this.myReactiveForm.get("id").setValue(data._id);
  }

  updateMarketingManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editMarketing(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      this.closeModal();
      this.presentToast("Marketing Updated");
    });
  }
  // getEmployee() {
  //   this.user.getEmp().subscribe((result) => {
  //     console.log("Employee result", result);
  //     this.employeeList = result["response"];
  //   });
  // }

 
}

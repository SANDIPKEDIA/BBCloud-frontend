import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../../../users.service";

@Component({
  selector: "app-add-edit-customertouchpoint",
  templateUrl: "./add-edit-customertouchpoint.page.html",
  styleUrls: ["./add-edit-customertouchpoint.page.scss"],
})
export class AddEditCustomertouchpointPageModel implements OnInit {
  myReactiveForm: FormGroup;
  isShow: boolean = false;
  editUserId;
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
    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      title: new FormControl(''),
      project: new FormControl(''),
      description: new FormControl(''),
      date: new FormControl(''),
      benifit: new FormControl(''),
    });

    

    if(this.data){
      this.editCustomertouchpoint(this.data);
    }
  }

  onSubmit() {
    this.isShow = false;
    this.user.saveCus(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      this.presentToast("CustomerTouchPoint added");
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

  editCustomertouchpoint(data) {
    this.isShow = true;
    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set
    this.myReactiveForm.get("id").setValue(data._id);
  }

  updateCustomertouchpoint(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editCus(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      this.closeModal();
      this.presentToast("CustomerTouchPoint Updated");
    });
  }


 
}

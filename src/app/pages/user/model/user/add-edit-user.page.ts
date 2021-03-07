import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../../../users.service";

@Component({
  selector: "app-add-edit-user",
  templateUrl: "./add-edit-user.page.html",
  styleUrls: ["./add-edit-user.page.scss"],
})
export class AddEditUserPageModel implements OnInit {
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
      fullName: new FormControl(''),
      mobile: new FormControl(''),
      email: new FormControl(''),
      userImage: new FormControl(''),
   
    });

    

    if(this.data){
      this.editUserManagement(this.data);
    }
  }

  onSubmit() {
    this.isShow = false;
    this.user.saveUser(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      this.presentToast("User added");
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

  editUserManagement(data) {
    this.isShow = true;
    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set
    this.myReactiveForm.get("id").setValue(data._id);
  }

  updateUserManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editUser(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      this.closeModal();
      this.presentToast("User Updated");
    });
  }


 
}

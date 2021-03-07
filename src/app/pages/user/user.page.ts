import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../users.service";
import { AddEditUserPageModel } from "./model/user/add-edit-user.page";

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})

export class UserPage implements OnInit {

  myReactiveForm: FormGroup;
  isShow: boolean = false;
  editUserId;
  formData;
  public show: boolean = false;
  list: any;
  // public del: string;
  constructor(
    private user: UsersService,
    public toastController: ToastController,
    public alertController: AlertController,
    public modalController: ModalController,
  ) {}

  getUser() {
    this.user.getUser().subscribe((result) => {
      console.log("User result", result);
      this.list = result["response"];
    });
  }

  ngOnInit() {
    this.getUser();

    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      fullName: new FormControl(''),
      mobile: new FormControl(''),
      email: new FormControl(''),
      userImage: new FormControl(''),

    });
  }

  onSubmit() {
    
    this.isShow = false;
    console.log(this.myReactiveForm);
    this.user.saveUser(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      // this.presentToast("User added");
      this.getUser();
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

  deleteUserManagement(id) {
      this.user.deleteUser(id).subscribe((data) => {
        this.getUser();
        this.presentToast("User Deleted");
      });
  }

 
  editUserManagement(data) {
    this.isShow = true;

    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set 
    this.myReactiveForm.get('id').setValue(data._id);
  }

  updateUserManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editUser(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      // this.presentToast("User Updated");
      this.getUser();
    });
  }

  async presentAlertConfirm(id) {
    let self = this;
    const alert = await this.alertController.create({
      header: 'Delete User',
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
            self.deleteUserManagement(id)
          }
        }
      ]
    });

    await alert.present();
  }

  async openAddUserModal() {
    const modal = await this.modalController.create({
      component: AddEditUserPageModel,
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getUser();
    });
    return await modal.present();
  }

  async openEditUserModal(body) {
        const modal = await this.modalController.create({
      component: AddEditUserPageModel,
      componentProps:{
        data:body
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getUser();
    });
    return await modal.present();
  }
  displayText() {
    this.show = !this.show
  }
  
}

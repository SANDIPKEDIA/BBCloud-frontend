import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../users.service";
import { AddEditCustomertouchpointPageModel } from "./model/customertouchpoint/add-edit-customertouchpoint.page";

@Component({
  selector: 'app-customertouchpoint',
  templateUrl: './customertouchpoint.page.html',
  styleUrls: ['./customertouchpoint.page.scss'],
})

export class CustomertouchpointPage implements OnInit {

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

  getCustomertouchpoint() {
    this.user.getCusT().subscribe((result) => {
      console.log("Customer result", result);
      this.list = result["response"];
    });
  }

  ngOnInit() {
    this.getCustomertouchpoint();

    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      title: new FormControl(''),
      project: new FormControl(''),
      description: new FormControl(''),
      date: new FormControl(''),
      benifit: new FormControl(''),
    });
  }

  onSubmit() {
    
    this.isShow = false;
    console.log(this.myReactiveForm);
    this.user.saveCus(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      // this.presentToast("Customer added");
      this.getCustomertouchpoint();
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

  deleteCustomertouchpoint(id) {
      this.user.deleteCus(id).subscribe((data) => {
        this.getCustomertouchpoint();
        this.presentToast("Customertouchpoint Deleted");
      });
  }

 
  editCustomertouchpoint(data) {
    this.isShow = true;

    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set 
    this.myReactiveForm.get('id').setValue(data._id);
  }

  updateCustomertouchpoint(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editCus(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      // this.presentToast("Customer Updated");
      this.getCustomertouchpoint();
    });
  }

  async presentAlertConfirm(id) {
    let self = this;
    const alert = await this.alertController.create({
      header: 'Delete Customertouchpoint',
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
            self.deleteCustomertouchpoint(id)
          }
        }
      ]
    });

    await alert.present();
  }

  async openAddCustomertouchpointModal() {
    const modal = await this.modalController.create({
      component: AddEditCustomertouchpointPageModel,
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getCustomertouchpoint();
    });
    return await modal.present();
  }

  async openEditCustomertouchpointModal(body) {
        const modal = await this.modalController.create({
      component: AddEditCustomertouchpointPageModel,
      componentProps:{
        data:body
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getCustomertouchpoint();
    });
    return await modal.present();
  }
  displayText() {
    this.show = !this.show
  }
  
}

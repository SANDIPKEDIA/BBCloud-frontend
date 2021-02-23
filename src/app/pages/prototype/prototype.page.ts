import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../users.service";
import { AddEditPrototypePageModel } from "./model/prototype/add-edit-prototype.page";

@Component({
  selector: 'app-prototype',
  templateUrl: './prototype.page.html',
  styleUrls: ['./prototype.page.scss'],
})

export class PrototypePage implements OnInit {

  myReactiveForm: FormGroup;
  isShow: boolean = false;
  editUserId;
  formData;
  list: any;
  // public del: string;
  constructor(
    private user: UsersService,
    public toastController: ToastController,
    public alertController: AlertController,
    public modalController: ModalController,
  ) {}

  getProtoype() {
    this.user.getData().subscribe((result) => {
      console.log("Prototype result", result);
      this.list = result["response"];
    });
  }

  ngOnInit() {
    this.getProtoype();

    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      catagory: new FormControl(''),
      designs_count: new FormControl(''),
    });
  }

  onSubmit() {
    
    this.isShow = false;
    console.log(this.myReactiveForm);
    this.user.savePrototype(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      this.presentToast("Prototype added");
      this.getProtoype();
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

  deletePrototypeManagement(id) {
      this.user.deletePrototype(id).subscribe((data) => {
        this.getProtoype();
        this.presentToast("Prototype Deleted");
      });
  }

 
  editPrototypeManagement(data) {
    this.isShow = true;

    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set 
    this.myReactiveForm.get('id').setValue(data._id);
  }

  updatePrototypeManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editPrototype(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      this.getProtoype();
    });
  }

  async presentAlertConfirm(id) {
    let self = this;
    const alert = await this.alertController.create({
      header: 'Delete Prototype',
      message: "Are you sure you want to delete ?",
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
            self.deletePrototypeManagement(id)
          }
        }
      ]
    });

    await alert.present();
  }

  async openAddPrototypeModal() {
    const modal = await this.modalController.create({
      component: AddEditPrototypePageModel,
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getProtoype();
    });
    return await modal.present();
  }

  async openEditPrototypeModal(body) {
        const modal = await this.modalController.create({
      component: AddEditPrototypePageModel,
      componentProps:{
        data:body
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getProtoype();
    });
    return await modal.present();
  }
  
}

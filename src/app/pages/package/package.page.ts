import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../users.service";
import { AddEditPackagePageModel } from "./model/package/add-edit-package.page";

@Component({
  selector: 'app-package',
  templateUrl: './package.page.html',
  styleUrls: ['./package.page.scss'],
})

export class PackagePage implements OnInit {

  myReactiveForm: FormGroup;
  isShow: boolean = false;
  isOn: boolean;
  editUserId;
  formData;
  public arr:any=[];
  public show: boolean = false;
  list: any;
  // public del: string;
  constructor(
    private user: UsersService,
    public toastController: ToastController,
    public alertController: AlertController,
    public modalController: ModalController,
  ) {}

  getPackageManagement() {
    this.user.getPackage().subscribe((result) => {
      console.log("Package result", result);
      this.list = result["response"];
    });
  }

  ngOnInit() {
    this.getPackageManagement();

    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      name: new FormControl(''),
      details: new FormControl(''),
      price: new FormControl(''),
      tags: new FormControl(this.arr),
     
      
    });
  }

  onSubmit() {
    
    this.isShow = false;
    console.log(this.myReactiveForm);
    this.user.savePackage(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      // this.presentToast("Package added");
      this.getPackageManagement();
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

  deletePackageManagement(id) {
      this.user.deletePackage(id).subscribe((data) => {
        this.getPackageManagement();
        this.presentToast("Package Deleted");
      });
  }

 
  editPackageManagement(data) {
    this.isShow = true;

    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set 
    this.myReactiveForm.get('id').setValue(data._id);
  }

  updatePackageManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editPackage(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      // this.presentToast("Package Updated");
      this.getPackageManagement();
    });
  }

  async presentAlertConfirm(id) {
    let self = this;
    const alert = await this.alertController.create({
      header: 'Delete Package',
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
            self.deletePackageManagement(id)
          }
        }
      ]
    });

    await alert.present();
  }

  async openAddPackageModal() {
    const modal = await this.modalController.create({
      component: AddEditPackagePageModel,
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getPackageManagement();
    });
    return await modal.present();
  }

  async openEditPackageModal(body) {
        const modal = await this.modalController.create({
      component: AddEditPackagePageModel,
      componentProps:{
        data:body
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getPackageManagement();
    });
    return await modal.present();
  }
  displayText() {
    this.show = !this.show
  }
  
}

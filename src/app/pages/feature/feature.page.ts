import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../users.service";
import { AddEditFeaturePageModel } from "./model/feature/add-edit-feature.page";

@Component({
  selector: 'app-feature',
  templateUrl: './feature.page.html',
  styleUrls: ['./feature.page.scss'],
})

export class FeaturePage implements OnInit {

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

  getFeatureManagement() {
    this.user.getFeature().subscribe((result) => {
      console.log("Feature result", result);
      this.list = result["response"];
    });
  }

  ngOnInit() {
    this.getFeatureManagement();

    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      package_id: new FormControl(''),
      description: new FormControl(''),
      feature_name: new FormControl(''),
      
    });
  }

  onSubmit() {
    
    this.isShow = false;
    console.log(this.myReactiveForm);
    this.user.saveFeature(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      // this.presentToast("Feature added");
      this.getFeatureManagement();
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

  deleteFeatureManagement(id) {
      this.user.deleteFeature(id).subscribe((data) => {
        this.getFeatureManagement();
        this.presentToast("Feature Deleted");
      });
  }

 
  editFeatureManagement(data) {
    this.isShow = true;

    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set 
    this.myReactiveForm.get('id').setValue(data._id);
  }

  updateFeatureManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editFeature(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      // this.presentToast("Feature Updated");
      this.getFeatureManagement();
    });
  }

  async presentAlertConfirm(id) {
    let self = this;
    const alert = await this.alertController.create({
      header: 'Delete Feature',
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
            self.deleteFeatureManagement(id)
          }
        }
      ]
    });

    await alert.present();
  }

  async openAddFeatureModal() {
    const modal = await this.modalController.create({
      component: AddEditFeaturePageModel,
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getFeatureManagement();
    });
    return await modal.present();
  }

  async openEditFeatureModal(body) {
        const modal = await this.modalController.create({
      component: AddEditFeaturePageModel,
      componentProps:{
        data:body
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getFeatureManagement();
    });
    return await modal.present();
  }
  displayText() {
    this.show = !this.show
  }
  
}

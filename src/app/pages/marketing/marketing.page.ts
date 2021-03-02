import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../users.service";
import { AddEditMarketingPageModel } from "./model/marketing/add-edit-marketing.page";

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.page.html',
  styleUrls: ['./marketing.page.scss'],
})

export class MarketingPage implements OnInit {

  myReactiveForm: FormGroup;
  isShow: boolean = false;
  isOn: boolean;
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

  getMarketingManagement() {
    this.user.getMarketing().subscribe((result) => {
      console.log("Marketing result", result);
      this.list = result["response"];
    });
  }

  ngOnInit() {
    this.getMarketingManagement();

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
  }

  onSubmit() {
    
    this.isShow = false;
    console.log(this.myReactiveForm);
    this.user.saveMarketing(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      // this.presentToast("Marketing added");
      this.getMarketingManagement();
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

  deleteMarketingManagement(id) {
      this.user.deleteMarketing(id).subscribe((data) => {
        this.getMarketingManagement();
        this.presentToast("Marketing Deleted");
      });
  }

 
  editMarketingManagement(data) {
    this.isShow = true;

    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set 
    this.myReactiveForm.get('id').setValue(data._id);
  }

  updateMarketingManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editMarketing(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      // this.presentToast("Marketing Updated");
      this.getMarketingManagement();
    });
  }

  async presentAlertConfirm(id) {
    let self = this;
    const alert = await this.alertController.create({
      header: 'Delete Marketing',
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
            self.deleteMarketingManagement(id)
          }
        }
      ]
    });

    await alert.present();
  }

  async openAddMarketingModal() {
    const modal = await this.modalController.create({
      component: AddEditMarketingPageModel,
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getMarketingManagement();
    });
    return await modal.present();
  }

  async openEditMarketingModal(body) {
        const modal = await this.modalController.create({
      component: AddEditMarketingPageModel,
      componentProps:{
        data:body
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getMarketingManagement();
    });
    return await modal.present();
  }
  displayText() {
    this.show = !this.show
  }
  
}

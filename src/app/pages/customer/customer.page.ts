import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../users.service";
import { AddEditCustomerPageModel } from "./model/customer/add-edit-customer.page";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})

export class CustomerPage implements OnInit {

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

  getCustomer() {
    this.user.getCus().subscribe((result) => {
      console.log("Customer result", result);
      this.list = result["response"];
    });
  }

  ngOnInit() {
    this.getCustomer();

    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      name: new FormControl(''),
      mobile: new FormControl(''),
      age: new FormControl(''),
      address: new FormControl(''),
      store_name: new FormControl(''),
      package: new FormControl(''),
      email: new FormControl(''),

    });
  }

  onSubmit() {
    
    this.isShow = false;
    console.log(this.myReactiveForm);
    this.user.saveCustomer(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      // this.presentToast("Customer added");
      this.getCustomer();
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

  deleteCustomerManagement(id) {
      this.user.deleteCustomer(id).subscribe((data) => {
        this.getCustomer();
        this.presentToast("Customer Deleted");
      });
  }

 
  editCustomerManagement(data) {
    this.isShow = true;

    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set 
    this.myReactiveForm.get('id').setValue(data._id);
  }

  updateCustomerManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editCustomer(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      // this.presentToast("Customer Updated");
      this.getCustomer();
    });
  }

  async presentAlertConfirm(id) {
    let self = this;
    const alert = await this.alertController.create({
      header: 'Delete Customer',
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
            self.deleteCustomerManagement(id)
          }
        }
      ]
    });

    await alert.present();
  }

  async openAddCustomerModal() {
    const modal = await this.modalController.create({
      component: AddEditCustomerPageModel,
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getCustomer();
    });
    return await modal.present();
  }

  async openEditCustomerModal(body) {
        const modal = await this.modalController.create({
      component: AddEditCustomerPageModel,
      componentProps:{
        data:body
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getCustomer();
    });
    return await modal.present();
  }
  displayText() {
    this.show = !this.show
  }
  
}

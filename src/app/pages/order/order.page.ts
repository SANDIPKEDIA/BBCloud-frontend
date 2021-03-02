import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../users.service";
import { AddEditOrderPageModel } from "./model/order/add-edit-order.page";

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})

export class OrderPage implements OnInit {

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

  getOrderManagement() {
    this.user.getOrder().subscribe((result) => {
      console.log("Order result", result);
      this.list = result["response"];
    });
  }

  ngOnInit() {
    this.getOrderManagement();

    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      name: new FormControl(''),
      store_name: new FormControl(''),
      contact: new FormControl(''),
      prototype_id: new FormControl(''),
      address: new FormControl(''),
      date: new FormControl(''),
      comments: new FormControl(''),
    });
  }

  onSubmit() {
    
    this.isShow = false;
    console.log(this.myReactiveForm);
    this.user.saveOrder(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      // this.presentToast("Order added");
      this.getOrderManagement();
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

  deleteOrderManagement(id) {
      this.user.deleteOrder(id).subscribe((data) => {
        this.getOrderManagement();
        this.presentToast("Order Deleted");
      });
  }

 
  editOrderManagement(data) {
    this.isShow = true;

    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set 
    this.myReactiveForm.get('id').setValue(data._id);
  }

  updateOrderManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editOrder(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      // this.presentToast("Order Updated");
      this.getOrderManagement();
    });
  }

  async presentAlertConfirm(id) {
    let self = this;
    const alert = await this.alertController.create({
      header: 'Delete Order',
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
            self.deleteOrderManagement(id)
          }
        }
      ]
    });

    await alert.present();
  }

  async openAddOrderModal() {
    const modal = await this.modalController.create({
      component: AddEditOrderPageModel,
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getOrderManagement();
    });
    return await modal.present();
  }

  async openEditOrderModal(body) {
        const modal = await this.modalController.create({
      component: AddEditOrderPageModel,
      componentProps:{
        data:body
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getOrderManagement();
    });
    return await modal.present();
  }
  displayText() {
    this.show = !this.show
  }
  
}

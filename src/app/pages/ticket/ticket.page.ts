import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../users.service";
import { AddEditTicketPageModel } from "./model/ticket/add-edit-ticket.page";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})

export class TicketPage implements OnInit {

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

  getTicketManagement() {
    this.user.getTicket().subscribe((result) => {
      console.log("Ticket result", result);
      this.list = result["response"];
    });
  }

  ngOnInit() {
    this.getTicketManagement();

    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      ticket_name: new FormControl(''),
      description: new FormControl(''),
      startdate: new FormControl(''),
      enddate: new FormControl(''),
      isBlocker: new FormControl(''),
      comments: new FormControl(''),
      
    });
  }

  onSubmit() {
    
    this.isShow = false;
    console.log(this.myReactiveForm);
    this.user.saveTicket(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      // this.presentToast("Ticket added");
      this.getTicketManagement();
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

  deleteTicketManagement(id) {
      this.user.deleteTicket(id).subscribe((data) => {
        this.getTicketManagement();
        this.presentToast("Ticket Deleted");
      });
  }

 
  editTicketManagement(data) {
    this.isShow = true;

    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set 
    this.myReactiveForm.get('id').setValue(data._id);
  }

  updateTicketManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editTicket(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      // this.presentToast("Ticket Updated");
      this.getTicketManagement();
    });
  }

  async presentAlertConfirm(id) {
    let self = this;
    const alert = await this.alertController.create({
      header: 'Delete Ticket',
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
            self.deleteTicketManagement(id)
          }
        }
      ]
    });

    await alert.present();
  }

  async openAddTicketModal() {
    const modal = await this.modalController.create({
      component: AddEditTicketPageModel,
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getTicketManagement();
    });
    return await modal.present();
  }

  async openEditTicketModal(body) {
        const modal = await this.modalController.create({
      component: AddEditTicketPageModel,
      componentProps:{
        data:body
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getTicketManagement();
    });
    return await modal.present();
  }
  displayText() {
    this.show = !this.show
  }
  
}

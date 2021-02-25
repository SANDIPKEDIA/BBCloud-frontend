import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../users.service";
import { AddEditFeedbackPageModel } from "./model/feedback/add-edit-feedback.page";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})

export class FeedbackPage implements OnInit {

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

  getFeedback() {
    this.user.getFeed().subscribe((result) => {
      console.log("Feedback result", result);
      this.list = result["response"];
    });
  }

  ngOnInit() {
    this.getFeedback();
    
    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      project: new FormControl(''),
      feedback: new FormControl(''),
      date: new FormControl(''),
      submitted_by: new FormControl(''),
      raise_by: new FormControl(''),
    
      

    });
  }

  onSubmit() {
    
    this.isShow = false;
    console.log(this.myReactiveForm);
    this.user.saveFeed(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      // this.presentToast("Task added");
      this.getFeedback();
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

  deleteFeedback(id) {
      this.user.deleteFeed(id).subscribe((data) => {
        this.getFeedback();
        this.presentToast("Feedback Deleted");
      });
  }

 
  editFeedback(data) {
    this.isShow = true;

    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set 
    this.myReactiveForm.get('id').setValue(data._id);
  }

  updateFeedback(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editFeed(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      // this.presentToast("Employee Updated");
      this.getFeedback();   
    });
  }

  async presentAlertConfirm(id) {
    let self = this;
    const alert = await this.alertController.create({
      header: 'Delete Feedback',
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
            self.deleteFeedback(id)
          }
        }
      ]
    });

    await alert.present();
  }

  async openAddFeedbackModal() {
    const modal = await this.modalController.create({
      component: AddEditFeedbackPageModel,
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getFeedback();
    });
    return await modal.present();
  }

  async openEditFeedbackModal(body) {
        const modal = await this.modalController.create({
      component: AddEditFeedbackPageModel,
      componentProps:{
        data:body
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getFeedback();
    });
    return await modal.present();
  }

 
  
}

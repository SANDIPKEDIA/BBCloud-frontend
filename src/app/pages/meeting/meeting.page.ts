import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../users.service";
import { AddEditMeetingPageModel } from "./model/meeting/add-edit-meeting.page";

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.page.html',
  styleUrls: ['./meeting.page.scss'],
})

export class MeetingPage implements OnInit {

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

  getMeetingManagement() {
    this.user.getMeeting().subscribe((result) => {
      console.log("Meeting result", result);
      this.list = result["response"];
    });
  }

  ngOnInit() {
    this.getMeetingManagement();

    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      meeting_name: new FormControl(''),
      description: new FormControl(''),
      comments: new FormControl(''),
      date: new FormControl(),
      time: new FormControl(''),
      url: new FormControl(''),
      joiness: new FormControl(''),
    });
  }

  onSubmit() {
    
    this.isShow = false;
    console.log(this.myReactiveForm);
    this.user.saveMeeting(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      // this.presentToast("Meeting added");
      this.getMeetingManagement();
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

  deleteMeetingManagement(id) {
      this.user.deleteMeeting(id).subscribe((data) => {
        this.getMeetingManagement();
        this.presentToast("Meeting Deleted");
      });
  }

 
  editMeetingManagement(data) {
    this.isShow = true;

    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set 
    this.myReactiveForm.get('id').setValue(data._id);
  }

  updateMeetingManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editMeeting(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      // this.presentToast("Meeting Updated");
      this.getMeetingManagement();
    });
  }

  async presentAlertConfirm(id) {
    let self = this;
    const alert = await this.alertController.create({
      header: 'Delete Meeting',
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
            self.deleteMeetingManagement(id)
          }
        }
      ]
    });

    await alert.present();
  }

  async openAddMeetingModal() {
    const modal = await this.modalController.create({
      component: AddEditMeetingPageModel,
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getMeetingManagement();
    });
    return await modal.present();
  }

  async openEditMeetingModal(body) {
        const modal = await this.modalController.create({
      component: AddEditMeetingPageModel,
      componentProps:{
        data:body
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getMeetingManagement();
    });
    return await modal.present();
  }
  displayText() {
    this.show = !this.show
  }


  
}

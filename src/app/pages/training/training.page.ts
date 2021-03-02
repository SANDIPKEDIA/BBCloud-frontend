import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../users.service";
import { AddEditTrainingPageModel } from "./model/training/add-edit-training.page";

@Component({
  selector: 'app-training',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.scss'],
})

export class TrainingPage implements OnInit {

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

  getTrainingManagement() {
    this.user.getTraining().subscribe((result) => {
      console.log("Training result", result);
      this.list = result["response"];
    });
  }

  ngOnInit() {
    this.getTrainingManagement();

    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      title: new FormControl(''),
      description: new FormControl(''),
      video_url: new FormControl(''),
      date: new FormControl(this.arr),
      catagory: new FormControl(''),
      
    });
  }

  onSubmit() {
    
    this.isShow = false;
    console.log(this.myReactiveForm);
    this.user.saveTraining(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      // this.presentToast("Training added");
      this.getTrainingManagement();
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

  deleteTrainingManagement(id) {
      this.user.deleteTraining(id).subscribe((data) => {
        this.getTrainingManagement();
        this.presentToast("Training Deleted");
      });
  }

 
  editTrainingManagement(data) {
    this.isShow = true;

    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set 
    this.myReactiveForm.get('id').setValue(data._id);
  }

  updateTrainingManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editTraining(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      // this.presentToast("Training Updated");
      this.getTrainingManagement();
    });
  }

  async presentAlertConfirm(id) {
    let self = this;
    const alert = await this.alertController.create({
      header: 'Delete Training',
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
            self.deleteTrainingManagement(id)
          }
        }
      ]
    });

    await alert.present();
  }

  async openAddTrainingModal() {
    const modal = await this.modalController.create({
      component: AddEditTrainingPageModel,
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getTrainingManagement();
    });
    return await modal.present();
  }

  async openEditTrainingModal(body) {
        const modal = await this.modalController.create({
      component: AddEditTrainingPageModel,
      componentProps:{
        data:body
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getTrainingManagement();
    });
    return await modal.present();
  }
  displayText() {
    this.show = !this.show
  }
  
}

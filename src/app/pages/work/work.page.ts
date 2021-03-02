import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../users.service";
import { AddEditWorkPageModel } from "./model/work/add-edit-work.page";

@Component({
  selector: 'app-work',
  templateUrl: './work.page.html',
  styleUrls: ['./work.page.scss'],
})

export class WorkPage implements OnInit {

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

  getWorkManagement() {
    this.user.getWork().subscribe((result) => {
      console.log("Work result", result);
      this.list = result["response"];
    });
  }

  ngOnInit() {
    this.getWorkManagement();

    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      work_name: new FormControl(''),
      description: new FormControl(''),
      comments: new FormControl(''),
      date: new FormControl(),
      time: new FormControl(''),
    });
  }

  onSubmit() {
    
    this.isShow = false;
    console.log(this.myReactiveForm);
    this.user.saveWork(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      // this.presentToast("Work added");
      this.getWorkManagement();
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

  deleteWorkManagement(id) {
      this.user.deleteWork(id).subscribe((data) => {
        this.getWorkManagement();
        this.presentToast("Work Deleted");
      });
  }

 
  editWorkManagement(data) {
    this.isShow = true;

    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set 
    this.myReactiveForm.get('id').setValue(data._id);
  }

  updateWorkManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editWork(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      // this.presentToast("Work Updated");
      this.getWorkManagement();
    });
  }

  async presentAlertConfirm(id) {
    let self = this;
    const alert = await this.alertController.create({
      header: 'Delete Work',
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
            self.deleteWorkManagement(id)
          }
        }
      ]
    });

    await alert.present();
  }

  async openAddWorkModal() {
    const modal = await this.modalController.create({
      component: AddEditWorkPageModel,
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getWorkManagement();
    });
    return await modal.present();
  }

  async openEditWorkModal(body) {
        const modal = await this.modalController.create({
      component: AddEditWorkPageModel,
      componentProps:{
        data:body
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getWorkManagement();
    });
    return await modal.present();
  }
  displayText() {
    this.show = !this.show
  }
  
}

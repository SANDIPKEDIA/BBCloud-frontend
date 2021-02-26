import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../users.service";
import { AddEditPlanPageModel } from "./model/plan/add-edit-plan.page";

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})

export class PlanPage implements OnInit {

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

  getPlanManagement() {
    this.user.getPlan().subscribe((result) => {
      console.log("Plan result", result);
      this.list = result["response"];
    });
  }

  ngOnInit() {
    this.getPlanManagement();

    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      title: new FormControl(''),
      start_date: new FormControl(''),
      end_date: new FormControl(''),
      description: new FormControl(''),
      comments: new FormControl(''),
    });
  }

  onSubmit() {
    
    this.isShow = false;
    console.log(this.myReactiveForm);
    this.user.savePlan(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      // this.presentToast("Plan added");
      this.getPlanManagement();
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

  deletePlanManagement(id) {
      this.user.deletePlan(id).subscribe((data) => {
        this.getPlanManagement();
        this.presentToast("Plan Deleted");
      });
  }

 
  editPlanManagement(data) {
    this.isShow = true;

    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set 
    this.myReactiveForm.get('id').setValue(data._id);
  }

  updatePlanManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editPlan(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      // this.presentToast("Plan Updated");
      this.getPlanManagement();
    });
  }

  async presentAlertConfirm(id) {
    let self = this;
    const alert = await this.alertController.create({
      header: 'Delete Plan',
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
            self.deletePlanManagement(id)
          }
        }
      ]
    });

    await alert.present();
  }

  async openAddPlanModal() {
    const modal = await this.modalController.create({
      component: AddEditPlanPageModel,
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getPlanManagement();
    });
    return await modal.present();
  }

  async openEditPlanModal(body) {
        const modal = await this.modalController.create({
      component: AddEditPlanPageModel,
      componentProps:{
        data:body
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getPlanManagement();
    });
    return await modal.present();
  }
  displayText() {
    this.show = !this.show
  }
  
}
